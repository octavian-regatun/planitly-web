import { useTheme } from "next-themes";
import { Button } from "./shadcn/button";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

export function ThemeButton() {
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button onClick={toggleTheme} size="icon">
      {theme === "light" ? (
        <MoonIcon className="h-6 w-6" />
      ) : (
        <SunIcon className="h-6 w-6" />
      )}
    </Button>
  );
}
