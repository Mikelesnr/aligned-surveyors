import axios from "axios";
window.axios = axios;

window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

// 1. Check if the current page is running securely over HTTPS
const isEncrypted = window.location.protocol === "https:";

window.Echo = new Echo({
    broadcaster: "reverb",

    // Fallback directly to your hardcoded production Reverb Key if .env is missing
    key: import.meta.env.VITE_REVERB_APP_KEY ?? "JfjKUH6DqWXCqJRfNdK7bL9v",

    // Automatically grabs "alignedsurveyors.co.zw" when live, or "localhost" when dev
    wsHost: import.meta.env.VITE_REVERB_HOST ?? window.location.hostname,

    // Dynamically assign standard system web ports based on SSL status
    wsPort: import.meta.env.VITE_REVERB_PORT ?? (isEncrypted ? 443 : 80),
    wssPort: import.meta.env.VITE_REVERB_PORT ?? (isEncrypted ? 443 : 80),

    // Forces secure connection if on production HTTPS
    forceTLS: import.meta.env.VITE_REVERB_SCHEME
        ? import.meta.env.VITE_REVERB_SCHEME === "https"
        : isEncrypted,

    enabledTransports: ["ws", "wss"],

    // =====================================================================
    // CRITICAL: Tells Echo to connect to wss://alignedsurveyors.co.zw/app
    // This perfectly matches your 'location /app' block in Nginx!
    // =====================================================================
    wsPath: "/app",
});
