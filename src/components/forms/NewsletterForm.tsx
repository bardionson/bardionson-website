"use client";

import { useState } from "react";

export function NewsletterForm() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const res = await fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (res.ok) {
                setStatus("success");
                setEmail("");
            } else {
                setStatus("error");
            }
        } catch (err) {
            setStatus("error");
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-sm w-full mx-auto sm:mx-0 relative">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        if (status !== "idle") setStatus("idle");
                    }}
                    placeholder="Enter your email"
                    disabled={status === "loading" || status === "success"}
                    className="bg-black/40 border border-white/10 rounded-full px-6 py-3 text-white focus:outline-none focus:border-primary transition-colors flex-grow disabled:opacity-50"
                    required
                />
                <button
                    type="submit"
                    disabled={status === "loading" || status === "success"}
                    className="bg-primary hover:bg-primary-dark text-white rounded-full px-8 py-3 font-medium transition-colors disabled:opacity-50"
                >
                    {status === "loading" ? "Subscribing..." : status === "success" ? "Subscribed" : "Subscribe"}
                </button>
            </form>
            <p className="text-xs mt-4 h-4 text-center">
                {status === "success" && <span className="text-green-400">Welcome to the expedition! Check your inbox soon.</span>}
                {status === "error" && <span className="text-red-400">Failed to subscribe. Please try again later.</span>}
            </p>
        </>
    );
}
