<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('group_admins', function (Blueprint $table) {
            $table->id();
            $table->uuid('group_id');
            $table->foreignId('user_id')->constrained('users')->onDelete('CASCADE');
            $table->timestamps();

            $table->foreign('group_id')->references('id')->on('groups')->onDelete('CASCADE');
            $table->unique(['group_id', 'user_id']); // Block duplicate administrative flags
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('group_admins');
    }
};
