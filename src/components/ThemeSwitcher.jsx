import { useTheme } from "../theme/ThemeProvider.jsx";

export function ThemeSwitcher() {
  const { theme, setTheme, /*toggle*/ } = useTheme();

  return (
    <div className="flex items-center gap-4">
      <button
        className="
          px-1.5 py-0.5 text-sm rounded 
          border-transparent
          bg-card text-card-foreground
          hover:bg-muted 
          active:border active:border-primary
          transition
        "
        onClick={() => setTheme("light")}
        aria-pressed={theme === "light"}
      >
        🔅 Light
      </button>
      <button
        className="
          px-1.5 py-0.5 text-sm rounded 
          border-transparent
          bg-card text-card-foreground
          hover:bg-muted 
          active:border active:border-primary
          transition
        "
        onClick={() => setTheme("dark")}
        aria-pressed={theme === "dark"}
      >
        🌙 Dark
      </button>

      {/* Opcional: toggle binario rápido */}
      {/* <button
        className="ml-4 px-2 py-1 rounded border bg-accent text-accent-foreground hover:bg-muted transition"
        onClick={toggle}
        title="Alternar dark/light"
      >
        ⇆
      </button> */}
    </div>
  );
}

{/* <button */}
        // className="
        //   px-2 py-1 rounded 
        //   border-transparent              /* sin borde normal */
        //   bg-card text-card-foreground
        //   hover:bg-muted 
        //   active:border active:border-primary /* aparece borde al presionar */
        //   transition
        // "
        // onClick={() => setTheme("system")}
        // aria-pressed={theme === "system"}
      // >
        {/* 🖥️ System */}
      {/* </button> */}
