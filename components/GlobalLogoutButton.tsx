"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { performClientLogout } from "@/lib/client-logout";

/**
 * Fixed bottom-left Logout on every page when the user has a session.
 */
export default function GlobalLogoutButton() {
    const pathname = usePathname();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        let cancelled = false;

        (async () => {
            try {
                const res = await fetch("/api/session", { credentials: "include" });
                const data = await res.json();
                if (cancelled) return;
                if (res.ok && data.user?.id) {
                    setVisible(true);
                    return;
                }
            } catch {
                /* fall through */
            }
            if (cancelled) return;
            const saved = localStorage.getItem("user");
            setVisible(!!saved);
        })();

        return () => {
            cancelled = true;
        };
    }, [pathname]);

    if (!visible) return null;

    return (
        <button
            type="button"
            onClick={() => void performClientLogout()}
            className="fixed bottom-4 left-4 z-50 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 shadow-lg transition hover:bg-slate-50"
        >
            Logout
        </button>
    );
}
