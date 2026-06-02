<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Project;
use App\Models\Service;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Inertia\Response;

class ChatbotController extends Controller
{
    /**
     * Render the public-facing chatbot chat interface.
     */
    public function index(): Response
    {
        return Inertia::render('Chatbot/Index');
    }

    /**
     * Handle incoming public inquiries using only public records and completed projects.
     */
    public function message(Request $request): JsonResponse
    {
        $request->validate([
            'message' => 'required|string|max:2000',
            'history' => 'nullable|array',
        ]);

        $userMessage = $request->input('message');
        $history = $request->input('history', []);

        // 1. Fetch only public services and public-visible clients
        $services = Service::all(['title', 'description'])->toArray();
        $clients = Client::where('is_visible', true)->get(['name'])->toArray();

        // 2. CRITICAL PROTECTION LAYER: Enforce strict filtering on completed projects only
        $completedProjects = Project::with(['service:id,title', 'client:id,name'])
            ->where('status', 'Completed') // Enforces strict exclusion of active corporate secrets
            ->get(['project_title', 'service_id', 'client_id'])
            ->map(function ($project) {
                return [
                    'historical_project_title' => $project->project_title,
                    'capability_sector' => $project->service?->title ?? 'General Engineering Surveying',
                    'client_name' => $project->client?->name ?? 'Confidential Client',
                ];
            })->toArray();

        // 3. System Instructions for Public User Engagement
        $systemContext = "You are the welcoming, official Public AI Ambassador for Aligned Surveyors. Your main purpose is to help public visitors, prospective clients, and partners instantly understand our core capabilities, completed works, and services without requiring them to read heavy documentation.\n\n";
        $systemContext .= "CORPORATE IDENTITY & FOUNDING:\n";
        $systemContext .= "- Name: Aligned Surveyors (PVT) LTD\n";
        $systemContext .= "- Core Motto: \"Impossible Is Impossible With Us\"\n";
        $systemContext .= "- Established: Practising since 2017 as an Engineering Surveying Consultancy firm.\n";
        $systemContext .= "- Mission Statement: To be a professional consultant providing cost-effective, timely solutions and advice within our scope of expertise, maximizing client satisfaction.\n";
        $systemContext .= "- Office Location: 9 Lincoln Court, Belgravia, Harare, Zimbabwe\n";
        $systemContext .= "- Contact Lines: +263 773 970 507 | +263 716 726 596\n";
        $systemContext .= "- Corporate Emails: kknyandoro@alignedsurveyors.com | kknyandoro@gmail.com\n";
        $systemContext .= "- Official Website: www.alignedsurveyors.com\n";
        $systemContext .= "- Principal Engineering Surveyor: Mr. KK Nyandoro (trained and qualified at the University of Zimbabwe)\n";
        $systemContext .= "- Professional Affiliations: Proudly registered with the Zimbabwe Institute of Geomatics (ZIG) and the Zimbabwe Information Communication and Technologies (ZICT) division of the Zimbabwe Institute of Engineers (ZIE).\n\n";

        $systemContext .= "TECHNICAL CAPABILITIES & ASSETS:\n";
        $systemContext .= "- Advanced Machinery Inventory: Fully equipped with industry-standard surveying tech including Topcon Hiper II GPS sets, Hi-Target V30 & V90 Differential GPS systems, TOPCON Total Stations, and DJI Phantom 4 Pro Drones for aerial photogrammetry.\n\n";

        $systemContext .= "OUR CORE CAPABILITIES & SERVICES:\n" . json_encode($services, JSON_PRETTY_PRINT) . "\n\n";
        $systemContext .= "OUR TRUSTED CUSTOMERS & PARTNERS:\n" . json_encode($clients, JSON_PRETTY_PRINT) . "\n\n";
        $systemContext .= "VERIFIED HISTORICAL TRACK RECORD (COMPLETED INFRASTRUCTURE PROJECTS):\n" . json_encode($completedProjects, JSON_PRETTY_PRINT) . "\n\n";

        $systemContext .= "BEHAVIORAL DIRECTIVES:\n";
        $systemContext .= "1. TONAL RANGE: Since some users prefer quick interactions over reading pages, be concise, direct, energetic, and highly professional. Use bullet points or summary snippets for easy scanning.\n";
        $systemContext .= "2. CONFIDENTIALITY BOUNDARY: You have zero knowledge of any current, pending, ongoing, or active surveying operations. If a visitor asks about ongoing or active client projects, state clearly that active client project logs are strictly classified under NDA parameters to protect client business secrets, and proudly pivot back to talking about our verified past completed track records instead.\n";
        $systemContext .= "3. FOCUS LIMITS: Keep responses focused on Aligned Surveyors' surveying capabilities. Politely decline general knowledge queries that deviate from land development, engineering, or mapping domains.";
        // 4. Construct payload sequence for Gemini endpoint
        $apiKey = config('services.gemini.api_key');

        $contents = [];
        foreach ($history as $chat) {
            $contents[] = [
                'role' => $chat['role'] === 'user' ? 'user' : 'model',
                'parts' => [['text' => $chat['text']]]
            ];
        }
        $contents[] = [
            'role' => 'user',
            'parts' => [['text' => $userMessage]]
        ];

        try {
            $response = Http::withHeaders([
                'Content-Type' => 'application/json',
            ])->post("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={$apiKey}", [
                'contents' => $contents,
                'systemInstruction' => [
                    'parts' => [['text' => $systemContext]]
                ],
                'generationConfig' => [
                    'temperature' => 0.2, // Slightly lower temperature for higher accuracy and consistency
                    'maxOutputTokens' => 600,
                ]
            ]);

            if ($response->failed()) {
                return response()->json(['error' => 'Core service communication anomaly.'], 500);
            }

            $result = $response->json();
            $replyText = $result['candidates'][0]['content']['parts'][0]['text'] ?? "I am ready to provide summaries of our verified spatial and infrastructure records. What project or corporate capability can I outline for you?";

            return response()->json(['reply' => $replyText]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'System exception processing public query.'], 500);
        }
    }
}
