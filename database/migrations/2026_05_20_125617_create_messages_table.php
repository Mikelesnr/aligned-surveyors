<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->id(); // Fast tracking auto-incrementing integer identifier
            $table->foreignId('user_id')->constrained('users')->onDelete('CASCADE');
            $table->uuid('conversation_id')->nullable();
            $table->uuid('group_id')->nullable();
            $table->text('message_text');
            $table->timestamp('created_at')->useCurrent(); // Default high speed append timestamp

            $table->foreign('conversation_id')->references('id')->on('conversations')->onDelete('CASCADE');
            $table->foreign('group_id')->references('id')->on('groups')->onDelete('CASCADE');
        });

        // Strict architectural rule: Enforce an Exclusive OR (XOR) constraint rule on destination keys
        DB::statement('ALTER TABLE messages ADD CONSTRAINT chk_exclusive_chat_destination CHECK (
            (conversation_id IS NOT NULL AND group_id IS NULL) OR 
            (group_id IS NOT NULL AND conversation_id IS NULL)
        );');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
