"use client";

import { ThemeToggle } from "./ThemeToggle";

/** Fixed theme control for login/signup pages */
export function AuthThemeBar() {
  return (
    <div className="fixed top-4 right-4 z-50">
      <ThemeToggle variant="icon" />
    </div>
  );
}
