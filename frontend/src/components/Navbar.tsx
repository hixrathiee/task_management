"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/auth";

export default function Navbar() {
    const [mounted, setMounted] = useState(false);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
        const email = localStorage.getItem("userEmail");
        setUserEmail(email);
    }, []);

    if (!mounted) return null;

    const handleLogout = async () => {
        await logout();
        router.push("/login");
    };

    const userInitial = userEmail
        ? userEmail.charAt(0).toUpperCase()
        : "U";

    return (
        <nav className="bg-blue-600">
            <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">

                {/* Left */}
                <h1 className="text-white text-2xl font-semibold tracking-tight">
                    Task Manager
                </h1>

                {/* Right */}
                <div className="flex items-center gap-4">

                    {/* User Info */}
                    {userEmail && (
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-blue-500 border border-white flex items-center justify-center text-white text-sm font-semibold">
                                {userInitial}
                            </div>

                            <span className="text-sm text-blue-100 hidden sm:block">
                                {userEmail}
                            </span>
                        </div>
                    )}

                    {/* Logout */}
                    <button
                        onClick={handleLogout}
                        className="bg-white text-blue-600 px-4 py-1.5 rounded-md text-sm font-medium hover:bg-neutral-100 transition"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}