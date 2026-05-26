<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Events\MessageSent;
use App\Models\Message;
use Illuminate\Support\Str;

class GroupController extends Controller
{
    // Fetch all groups the authenticated user is a member of
    public function index()
    {
        $user = Auth::user();

        // Fetch the groups the user is a member of
        $myGroups = $user->groupMemberships()->get();

        // Fetch public groups the user is NOT a member of
        // We prefix 'groups.id' to resolve the ambiguity
        $publicGroups = Group::where('is_private', false)
            ->whereNotIn('groups.id', $user->groupMemberships()->pluck('groups.id'))
            ->get();

        return inertia('Dashboard/Chat/Groups', [
            'myGroups' => $myGroups,
            'publicGroups' => $publicGroups,
            'activeGroup' => null,
        ]);
    }

    // Join a public group
    public function join(Group $group)
    {
        // Ensure group is public
        if ($group->is_private) {
            return back()->withErrors(['error' => 'This group is private.']);
        }

        // syncWithoutDetaching prevents errors if they are already a member
        $group->members()->syncWithoutDetaching([Auth::id()]);

        return back()->with('success', 'Joined group successfully.');
    }

    // Create a new group
    // App\Http\Controllers\GroupController.php

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'is_private' => 'boolean',
        ]);

        // Using transaction to ensure creator is also added to members/admins
        DB::transaction(function () use ($validated) {
            $group = Group::create([
                'name' => $validated['name'],
                'is_private' => $validated['is_private'] ?? false,
                'creator_id' => Auth::id(),
            ]);

            $group->members()->attach(Auth::id());
            $group->admins()->attach(Auth::id());
        });

        return back()->with('success', 'Group created successfully!');
    }

    // App\Http\Controllers\GroupController.php
    public function show(Group $group)
    {
        $user = Auth::user();

        // Authorization: Ensure user is a member
        if (!$group->members()->where('user_id', $user->id)->exists()) {
            abort(403);
        }

        // 1. Check if the current user is a group admin
        $isGroupAdmin = DB::table('group_admins')
            ->where('group_id', $group->id)
            ->where('user_id', Auth::id())
            ->exists();

        // Use the method defined in your Group model
        $existingMemberIds = $group->members()->pluck('users.id')->toArray();

        $potentialMembers = User::whereNotIn('id', $existingMemberIds)->get();

        return inertia('Dashboard/Chat/Groups', [
            'myGroups' => $user->groupMemberships()->get(),
            'publicGroups' => Group::where('is_private', false)
                ->whereNotIn('id', $user->groupMemberships()->pluck('groups.id'))
                ->get(),
            'activeGroup' => $group,
            'isGroupAdmin' => $isGroupAdmin,
            'availableUsers' => $potentialMembers,
        ]);
    }

    // App\Http\Controllers\GroupController.php
    public function addMember(Request $request, $groupId)
    {
        // 1. Validate the user ID exists
        $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        $group = Group::findOrFail($groupId);

        // 2. Security Check: Verify admin status in the group_admins table
        $isGroupAdmin = DB::table('group_admins')
            ->where('group_id', $group->id)
            ->where('user_id', Auth::id())
            ->exists();

        if (!$isGroupAdmin) {
            return response()->json(['message' => 'Unauthorized: Only group admins can add members.'], 403);
        }

        // 3. Attach the user using the correct relationship method defined in Group.php
        // We use members() because that is the name of your belongsToMany method
        $group->members()->syncWithoutDetaching([$request->user_id]);

        return response()->json(['message' => 'Member added successfully']);
    }

    // App/Http/Controllers/GroupController.php

    public function startMeeting(Request $request, Group $group)
    {
        $meetingId = (string) Str::uuid();
        $localMeetingUrl = route('groups.meeting.show', [
            'group' => $group->id,
            'meetingId' => $meetingId
        ]);

        // Store only the URL string in the message_text
        $message = Message::create([
            'user_id'      => Auth::id(),
            'group_id'     => $group->id,
            'message_text' => $localMeetingUrl,
            'is_meeting_alert' => true,
            'created_at'   => now(),
        ]);

        $message->refresh();
        $message->load('sender:id,name,role');

        // Broadcast the raw URL
        broadcast(new MessageSent($message))->toOthers();

        return response()->json(['meetingId' => $meetingId]);
    }
}
