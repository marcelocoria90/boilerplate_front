import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext({
  theme: "system", // "light" | "dark" | "system"
  setTheme: (_t) => {},
  toggle: () => {},
});

export function ThemeProvider({ children, defaultTheme = "system" }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ?? defaultTheme;
  });

  // Aplica clase .dark según preferencia (incluye "system")
  useEffect(() => {
    const root = document.documentElement;
    const apply = (t) => {
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const isDark = t === "dark" || (t === "system" && systemDark);
      root.classList.toggle("dark", isDark);
    };

    apply(theme);
    localStorage.setItem("theme", theme);

    // Si está en "system", escuchamos cambios del SO
    if (theme !== "system") return;

    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => apply("system");
    mql.addEventListener?.("change", handler);
    return () => mql.removeEventListener?.("change", handler);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
