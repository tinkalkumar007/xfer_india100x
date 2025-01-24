import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useTheme } from "@/components/theme-provider";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      {theme === "light" && (
        <div className="relative">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme("dark")}
          >
            <Moon />
          </Button>
        </div>
      )}
      {theme === "dark" && (
        <div className="relative">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme("light")}
          >
            <Sun />
          </Button>
        </div>
      )}
    </>
  );
}
