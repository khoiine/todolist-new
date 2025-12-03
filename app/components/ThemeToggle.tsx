"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const [theme, setTheme] = useState<"light" | "dark">(() => {
        if (typeof window === "undefined") return "light";
        const stored = localStorage.getItem("theme");
        if (stored === "dark" || stored === "light") return stored;
        return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    });

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        try { localStorage.setItem("theme", theme); } catch { }
    }, [theme]);

    return (
        <label onClick={() => setTheme(t => (t === "dark" ? "light" : "dark"))} className="flex items-center cursor-pointer">
            <div className="relative">
                <div className={"block w-14 h-8 rounded-full transition-all duration-300 " + (theme === "dark" ? "bg-black" : "bg-[#605dff]")}></div>
                <div className={"absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-all duration-300 " + (theme === "dark" ? "translate-x-6" : "")}></div>
            </div>
        </label>
    );
}