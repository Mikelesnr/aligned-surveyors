<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('service_id');
            $table->uuid('client_id');
            $table->string('project_title');
            $table->enum('status', ['active', 'completed'])->default('active');
            $table->boolean('is_visible')->default(false);
            $table->timestamps();

            // Set up strict database integrity links
            $table->foreign('service_id')->references('id')->on('services')->onDelete('RESTRICT');
            $table->foreign('client_id')->references('id')->on('clients')->onDelete('RESTRICT');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
