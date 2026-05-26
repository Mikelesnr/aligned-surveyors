<?php

namespace App\Services;

use Firebase\JWT\JWT;
use Illuminate\Support\Facades\Log;

class JitsiService
{
    /**
     * Generate a signed JWT for Jitsi/JaaS authentication.
     *
     * @param \App\Models\User $user
     * @param string $roomName
     * @return string
     */
    public function generateToken($user, $roomName)
    {
        $appId = config('services.jitsi.app_id');
        // Handle potential newline issues if the key is stored as a string in .env
        $privateKey = str_replace('\\n', "\n", config('services.jitsi.private_key'));
        $keyId = config('services.jitsi.key_id');

        $payload = [
            'aud' => 'jitsi',
            'iss' => 'chat',
            'sub' => $appId,
            'iat' => time(),
            'exp' => time() + 3600, // Token valid for 1 hour
            'context' => [
                'user' => [
                    'name' => $user->name,
                    'email' => $user->email,
                    'id' => (string)$user->id,
                    'avatar' => '', // Optional: Add avatar URL here
                ]
            ],
            'room' => $roomName
        ];

        try {
            return JWT::encode($payload, $privateKey, 'RS256', $keyId);
        } catch (\Exception $e) {
            Log::error('Jitsi Token Generation Failed: ' . $e->getMessage());
            throw $e;
        }
    }
}
