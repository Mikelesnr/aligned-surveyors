<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Group extends Model
{
    use HasUuids;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'creator_id',
    ];

    /**
     * Reference the user who generated this group chat thread.
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'creator_id');
    }

    /**
     * The staff members enrolled inside this group chat.
     */
    public function members(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'group_members', 'group_id', 'user_id')->withTimestamps();
    }

    /**
     * The specific users granted channel moderation/admin rights.
     */
    public function admins(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'group_admins', 'group_id', 'user_id')->withTimestamps();
    }

    /**
     * Get all broadcast messages associated with this room.
     */
    public function messages(): HasMany
    {
        return $this->hasMany(Message::class, 'group_id');
    }
}
