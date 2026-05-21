import { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function FloatingChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: "model",
            text: "Hello! If you have any quick questions about our surveying services, client list, or completed works, ask me right here—no heavy reading required!",
        },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const messagesEndRef = useRef(null);
    const chatbotRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, loading, isOpen]);

    // Handle Outside Click-Away to close the bot smoothly
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                isOpen &&
                chatbotRef.current &&
                !chatbotRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, [isOpen]);

    const handleSendMessage = async (e) => {
        // CRITICAL: Stop the browser from attempting native GET submission form reloads
        e.preventDefault();
        e.stopPropagation();

        if (!input.trim() || loading) return;

        const userText = input;
        setInput("");

        const updatedMessages = [...messages, { role: "user", text: userText }];
        setMessages(updatedMessages);
        setLoading(true);

        try {
            // Explicitly force POST context over Axios execution array
            const response = await axios({
                method: "post",
                url: route("chatbot.message"),
                data: {
                    message: userText,
                    history: messages.slice(-10),
                },
            });

            setMessages([
                ...updatedMessages,
                { role: "model", text: response.data.reply },
            ]);
        } catch (error) {
            setMessages([
                ...updatedMessages,
                {
                    role: "model",
                    text: "⚠️ Connection lost. Please verify your connection parameters and try again.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            ref={chatbotRef}
            className="fixed bottom-6 right-6 z-50 font-sans text-white"
        >
            {/* Toggle Button Bubble */}
            {!isOpen && (
                <button
                    type="button" // Stops it from acting as a form processor button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsOpen(true);
                    }}
                    className="flex items-center space-x-2 bg-zinc-900/90 hover:bg-zinc-800 border border-green-500/40 px-4 py-3 rounded-full shadow-[0_4px_25px_rgba(0,0,0,0.6)] transition-all transform hover:-translate-y-1 group"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-xs font-mono uppercase tracking-wider font-semibold text-zinc-200 group-hover:text-green-400 transition-colors">
                        Ask Survey Bot
                    </span>
                    <span className="text-base">💬</span>
                </button>
            )}

            {/* Expanded Chat Console Box */}
            {isOpen && (
                <div
                    className="w-[90vw] sm:w-[400px] h-[500px] bg-zinc-950/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] flex flex-col justify-between overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header Bar */}
                    <div className="bg-zinc-900/80 px-4 py-3 border-b border-white/5 flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <span className="w-2 h-2 rounded-full bg-green-500" />
                            <div>
                                <h3 className="text-sm font-bold tracking-tight">
                                    Survey Assistant
                                </h3>
                                <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-tight">
                                    Powered by Gemini
                                </p>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setIsOpen(false);
                            }}
                            className="text-zinc-500 hover:text-white transition-colors text-xs font-mono px-2 py-1 rounded hover:bg-white/5"
                        >
                            ✕ Close
                        </button>
                    </div>

                    {/* Messages Panel Container */}
                    <div className="flex-grow p-4 overflow-y-auto space-y-3 bg-gradient-to-b from-transparent to-black/30">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`max-w-[85%] rounded-xl p-3 border text-xs leading-relaxed ${
                                        msg.role === "user"
                                            ? "bg-green-600/10 border-green-500/30 text-green-100 rounded-br-none"
                                            : "bg-zinc-900/90 border-zinc-800 text-zinc-200 rounded-bl-none"
                                    }`}
                                >
                                    <p className="whitespace-pre-line">
                                        {msg.text}
                                    </p>
                                </div>
                            </div>
                        ))}

                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl rounded-bl-none p-3 max-w-[60%] shadow-md">
                                    <div className="flex items-center space-x-1.5">
                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce" />
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Terminal Form Input Area */}
                    <form
                        onSubmit={handleSendMessage}
                        className="p-3 bg-zinc-900/40 border-t border-white/5"
                    >
                        <div className="relative flex items-center bg-zinc-900 border border-white/10 rounded-lg overflow-hidden focus-within:border-green-500/40 transition-colors">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask about our services or projects..."
                                className="w-full bg-transparent border-0 py-2.5 pl-3 pr-16 text-xs text-white placeholder-zinc-600 focus:ring-0 focus:outline-none"
                                disabled={loading}
                            />
                            <button
                                type="submit" // Trigger explicit onSubmit structural intercept
                                disabled={loading || !input.trim()}
                                className="absolute right-2 bg-green-600 hover:bg-green-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-black font-bold text-[10px] font-mono uppercase tracking-wider py-1 px-2.5 rounded transition-all"
                            >
                                Send
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
