<?php

use App\Http\Controllers\ChatController;
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\MeetingController;
use App\Http\Controllers\JitsiTokenController;
use App\Models\User;
use App\Models\Conversation;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Detached System Communications Terminal Router
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'verified'])->group(function () {

    // Ensure this route exists and is accessible
    Route::get('/jitsi-token', [JitsiTokenController::class, 'generate'])
        ->name('jitsi.token')
        ->middleware('auth');

    Route::get('/api/chat/conversations', [ConversationController::class, 'index'])->name('chat.conversation.index');
    Route::post('/api/chat/conversations', [ConversationController::class, 'store'])->name('chat.conversation.store');
    Route::delete('/api/chat/conversations/{id}', [ConversationController::class, 'destroy'])->name('chat.conversation.destroy');
    Route::get('/workspace/communications/groups', [GroupController::class, 'index'])
        ->name('groups.index');
    Route::get('/workspace/communications/groups/{group}', [GroupController::class, 'show'])
        ->name('chat.group.show');
    Route::post('/workspace/communications/groups', [GroupController::class, 'store'])->name('groups.store');
    Route::post('/workspace/communications/groups/{group}/join', [GroupController::class, 'join'])->name('groups.join');
    // Route::post('/workspace/communications/groups/{group}/leave', [GroupController::class, 'leave'])->name('groups.leave');
    // Route::delete('/workspace/communications/groups/{group}', [GroupController::class, 'destroy'])->name('groups.destroy');

    Route::post('/groups/{group}/add-member', [GroupController::class, 'addMember'])
        ->name('groups.addMember');

    // Add this dedicated route for group messaging
    Route::post('/workspace/communications/groups/{group}/messages', [ChatController::class, 'sendGroupMessage'])
        ->name('groups.messages.store');

    // start and show meeting routes for group video conferencing
    Route::get('/workspace/communications/groups/{group}/meeting/{meetingId}', [MeetingController::class, 'show'])
        ->name('groups.meeting.show');

    // Independent workspace console renderer
    Route::get('/workspace/communications', function () {
        $authId = auth()->id();

        return Inertia::render('Dashboard/Chat/Index', [
            // Feed active operators directory list
            'contacts' => User::where('id', '!=', $authId)
                ->where('is_active', true)
                ->orderBy('name')
                ->get(['id', 'name', 'role']),

            // Map historical peer threads with explicit target participant indicators
            'conversations' => Conversation::where('user_one_id', $authId)
                ->orWhere('user_two_id', $authId)
                ->with(['userOne:id,name,role', 'userTwo:id,name,role'])
                ->latest()
                ->get()
                ->map(function ($convo) use ($authId) {
                    $convo->recipient = ($convo->user_one_id === $authId) ? $convo->userTwo : $convo->userOne;
                    return $convo;
                }),

            // Load authorized multi-tenant channel rooms
            'groups' => auth()->user()->groupMemberships()
                ->orderBy('groups.name')
                ->get(['groups.id', 'groups.name', 'groups.creator_id']),
        ]);
    })->name('chat.index');

    // JSON API streams backing the live windows
    Route::get('/api/chat/history/{type}/{id}', [ChatController::class, 'fetchMessages'])->name('chat.history');
    Route::post('/api/chat/transmit', [ChatController::class, 'sendMessage'])->name('chat.transmit');
    Route::post('/workspace/communications/group', [ChatController::class, 'startGroup'])->name('chat.group.start');
});

Route::middleware(['auth', 'verified', 'can:isPersonnel'])->group(function () {
    // Only staff/admin can access these routes
    Route::post('/workspace/communications/groups/{group}/meeting', [GroupController::class, 'startMeeting'])
        ->name('groups.meeting.start');

    // Your other sensitive group routes...
});
