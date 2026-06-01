import axios from "axios";
window.axios = axios;

window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

const isEncrypted = window.location.protocol === "https:";

window.Echo = new Echo({
    broadcaster: "reverb",

    key: import.meta.env.VITE_REVERB_APP_KEY ?? "JfjKUH6DqWXCqJRfNdK7bL9v",
    wsHost: import.meta.env.VITE_REVERB_HOST ?? window.location.hostname,

    wsPort: import.meta.env.VITE_REVERB_PORT ?? (isEncrypted ? 443 : 80),
    wssPort: import.meta.env.VITE_REVERB_PORT ?? (isEncrypted ? 443 : 80),

    forceTLS: import.meta.env.VITE_REVERB_SCHEME
        ? import.meta.env.VITE_REVERB_SCHEME === "https"
        : isEncrypted,

    enabledTransports: ["ws", "wss"],

    // =====================================================================
    // REMOVE OR EMPTY THIS VALUE
    // Echo naturally adds the first "/app". Leaving this blank stops the duplication!
    // =====================================================================
    wsPath: "",
});
