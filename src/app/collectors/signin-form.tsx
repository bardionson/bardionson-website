"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export function SignInForm() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await signIn("credentials", {
                password,
                redirect: false,
            });
            if (res?.error) {
                setError(true);
            } else {
                window.location.reload();
            }
        } catch (err) {
            setError(true);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setError(false);
                    }}
                    placeholder="Enter Vault Password"
                    className={`bg-black/40 border ${error ? 'border-red-500/50' : 'border-white/10'} rounded-lg px-6 py-3 text-white focus:outline-none focus:border-primary transition-colors text-center tracking-widest`}
                />
                <button
                    type="submit"
                    className="bg-primary hover:bg-primary-dark text-white rounded-lg px-8 py-3 font-medium transition-colors"
                >
                    Unlock via Password
                </button>
            </form>

            <div className="flex items-center gap-4 py-4 text-white/20">
                <div className="flex-1 border-b border-current"></div>
                <span className="text-xs uppercase tracking-widest text-white/50">or</span>
                <div className="flex-1 border-b border-current"></div>
            </div>

            <button
                type="button"
                onClick={() => alert('RabbyKit Wallet Connect would open here')}
                className="bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg px-8 py-3 font-medium transition-all group w-full"
            >
                <span className="mr-2 opacity-50 group-hover:opacity-100 transition-opacity">🦊</span>
                Connect Web3 Wallet
            </button>

            {error && (
                <p className="text-red-400 text-sm mt-2">Incorrect credentials. Please try again.</p>
            )}
        </div>
    );
}
