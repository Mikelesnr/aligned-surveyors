<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Service extends Model
{
    use HasUuids;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'slug',
        'description',
    ];

    /**
     * Get the projects associated with this corporate capability service.
     */
    public function projects(): HasMany
    {
        return $this->hasMany(Project::class, 'service_id');
    }
}
