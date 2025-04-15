"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";

import { useTheme } from "next-themes";

// Define color schemes with all necessary variables
export const COLOR_SCHEMES = {
  blue: {
    primary: "oklch(0.55 0.2 240)",
    primaryForeground: "oklch(0.985 0 0)",
    secondary: "oklch(0.96 0.03 240)",
    secondaryForeground: "oklch(0.25 0.1 240)",
    accent: "oklch(0.9 0.05 240)",
    accentForeground: "oklch(0.25 0.1 240)",
    ring: "oklch(0.55 0.2 240)",
    sidebarPrimary: "oklch(0.55 0.2 240)",
    sidebarPrimaryForeground: "oklch(0.985 0 0)",
    sidebarAccent: "oklch(0.96 0.03 240)",
    sidebarAccentForeground: "oklch(0.25 0.1 240)",
    sidebarRing: "oklch(0.55 0.2 240)",
    chart1: "oklch(0.55 0.2 240)",
    chart2: "oklch(0.6 0.2 200)",
    chart3: "oklch(0.65 0.2 160)",
    chart4: "oklch(0.6 0.2 280)",
    chart5: "oklch(0.65 0.2 320)",
    // Dark mode variants
    darkPrimary: "oklch(0.65 0.2 240)",
    darkPrimaryForeground: "oklch(0.1 0 0)",
    darkSecondary: "oklch(0.25 0.05 240)",
    darkSecondaryForeground: "oklch(0.985 0 0)",
    darkAccent: "oklch(0.3 0.1 240)",
    darkAccentForeground: "oklch(0.985 0 0)",
    darkRing: "oklch(0.65 0.2 240)",
    darkSidebarPrimary: "oklch(0.65 0.2 240)",
    darkSidebarPrimaryForeground: "oklch(0.985 0 0)",
    darkSidebarAccent: "oklch(0.25 0.05 240)",
    darkSidebarAccentForeground: "oklch(0.985 0 0)",
    darkSidebarRing: "oklch(0.65 0.2 240)",
    darkChart1: "oklch(0.65 0.2 240)",
    darkChart2: "oklch(0.7 0.2 200)",
    darkChart3: "oklch(0.75 0.2 160)",
    darkChart4: "oklch(0.7 0.2 280)",
    darkChart5: "oklch(0.75 0.2 320)",
  },
  green: {
    primary: "oklch(0.55 0.2 160)",
    primaryForeground: "oklch(0.985 0 0)",
    secondary: "oklch(0.96 0.03 160)",
    secondaryForeground: "oklch(0.25 0.1 160)",
    accent: "oklch(0.9 0.05 160)",
    accentForeground: "oklch(0.25 0.1 160)",
    ring: "oklch(0.55 0.2 160)",
    sidebarPrimary: "oklch(0.55 0.2 160)",
    sidebarPrimaryForeground: "oklch(0.985 0 0)",
    sidebarAccent: "oklch(0.96 0.03 160)",
    sidebarAccentForeground: "oklch(0.25 0.1 160)",
    sidebarRing: "oklch(0.55 0.2 160)",
    chart1: "oklch(0.55 0.2 160)",
    chart2: "oklch(0.6 0.2 120)",
    chart3: "oklch(0.65 0.2 200)",
    chart4: "oklch(0.6 0.2 80)",
    chart5: "oklch(0.65 0.2 240)",
    // Dark mode variants
    darkPrimary: "oklch(0.65 0.2 160)",
    darkPrimaryForeground: "oklch(0.1 0 0)",
    darkSecondary: "oklch(0.25 0.05 160)",
    darkSecondaryForeground: "oklch(0.985 0 0)",
    darkAccent: "oklch(0.3 0.1 160)",
    darkAccentForeground: "oklch(0.985 0 0)",
    darkRing: "oklch(0.65 0.2 160)",
    darkSidebarPrimary: "oklch(0.65 0.2 160)",
    darkSidebarPrimaryForeground: "oklch(0.985 0 0)",
    darkSidebarAccent: "oklch(0.25 0.05 160)",
    darkSidebarAccentForeground: "oklch(0.985 0 0)",
    darkSidebarRing: "oklch(0.65 0.2 160)",
    darkChart1: "oklch(0.65 0.2 160)",
    darkChart2: "oklch(0.7 0.2 120)",
    darkChart3: "oklch(0.75 0.2 200)",
    darkChart4: "oklch(0.7 0.2 80)",
    darkChart5: "oklch(0.75 0.2 240)",
  },
  purple: {
    primary: "oklch(0.55 0.2 280)",
    primaryForeground: "oklch(0.985 0 0)",
    secondary: "oklch(0.96 0.03 280)",
    secondaryForeground: "oklch(0.25 0.1 280)",
    accent: "oklch(0.9 0.05 280)",
    accentForeground: "oklch(0.25 0.1 280)",
    ring: "oklch(0.55 0.2 280)",
    sidebarPrimary: "oklch(0.55 0.2 280)",
    sidebarPrimaryForeground: "oklch(0.985 0 0)",
    sidebarAccent: "oklch(0.96 0.03 280)",
    sidebarAccentForeground: "oklch(0.25 0.1 280)",
    sidebarRing: "oklch(0.55 0.2 280)",
    chart1: "oklch(0.55 0.2 280)",
    chart2: "oklch(0.6 0.2 240)",
    chart3: "oklch(0.65 0.2 320)",
    chart4: "oklch(0.6 0.2 200)",
    chart5: "oklch(0.65 0.2 160)",
    // Dark mode variants
    darkPrimary: "oklch(0.65 0.2 280)",
    darkPrimaryForeground: "oklch(0.1 0 0)",
    darkSecondary: "oklch(0.25 0.05 280)",
    darkSecondaryForeground: "oklch(0.985 0 0)",
    darkAccent: "oklch(0.3 0.1 280)",
    darkAccentForeground: "oklch(0.985 0 0)",
    darkRing: "oklch(0.65 0.2 280)",
    darkSidebarPrimary: "oklch(0.65 0.2 280)",
    darkSidebarPrimaryForeground: "oklch(0.985 0 0)",
    darkSidebarAccent: "oklch(0.25 0.05 280)",
    darkSidebarAccentForeground: "oklch(0.985 0 0)",
    darkSidebarRing: "oklch(0.65 0.2 280)",
    darkChart1: "oklch(0.65 0.2 280)",
    darkChart2: "oklch(0.7 0.2 240)",
    darkChart3: "oklch(0.75 0.2 320)",
    darkChart4: "oklch(0.7 0.2 200)",
    darkChart5: "oklch(0.75 0.2 160)",
  },
  orange: {
    primary: "oklch(0.65 0.25 60)",
    primaryForeground: "oklch(0.985 0 0)",
    secondary: "oklch(0.96 0.03 60)",
    secondaryForeground: "oklch(0.25 0.1 60)",
    accent: "oklch(0.9 0.05 60)",
    accentForeground: "oklch(0.25 0.1 60)",
    ring: "oklch(0.65 0.25 60)",
    sidebarPrimary: "oklch(0.65 0.25 60)",
    sidebarPrimaryForeground: "oklch(0.985 0 0)",
    sidebarAccent: "oklch(0.96 0.03 60)",
    sidebarAccentForeground: "oklch(0.25 0.1 60)",
    sidebarRing: "oklch(0.65 0.25 60)",
    chart1: "oklch(0.65 0.25 60)",
    chart2: "oklch(0.7 0.25 30)",
    chart3: "oklch(0.75 0.25 90)",
    chart4: "oklch(0.7 0.25 120)",
    chart5: "oklch(0.75 0.25 0)",
    // Dark mode variants
    darkPrimary: "oklch(0.75 0.25 60)",
    darkPrimaryForeground: "oklch(0.1 0 0)",
    darkSecondary: "oklch(0.35 0.05 60)",
    darkSecondaryForeground: "oklch(0.985 0 0)",
    darkAccent: "oklch(0.4 0.1 60)",
    darkAccentForeground: "oklch(0.985 0 0)",
    darkRing: "oklch(0.75 0.25 60)",
    darkSidebarPrimary: "oklch(0.75 0.25 60)",
    darkSidebarPrimaryForeground: "oklch(0.985 0 0)",
    darkSidebarAccent: "oklch(0.35 0.05 60)",
    darkSidebarAccentForeground: "oklch(0.985 0 0)",
    darkSidebarRing: "oklch(0.75 0.25 60)",
    darkChart1: "oklch(0.75 0.25 60)",
    darkChart2: "oklch(0.8 0.25 30)",
    darkChart3: "oklch(0.85 0.25 90)",
    darkChart4: "oklch(0.8 0.25 120)",
    darkChart5: "oklch(0.85 0.25 0)",
  },
  red: {
    primary: "oklch(0.65 0.3 25)",
    primaryForeground: "oklch(0.985 0 0)",
    secondary: "oklch(0.96 0.03 25)",
    secondaryForeground: "oklch(0.25 0.1 25)",
    accent: "oklch(0.9 0.05 25)",
    accentForeground: "oklch(0.25 0.1 25)",
    ring: "oklch(0.65 0.3 25)",
    sidebarPrimary: "oklch(0.65 0.3 25)",
    sidebarPrimaryForeground: "oklch(0.985 0 0)",
    sidebarAccent: "oklch(0.96 0.03 25)",
    sidebarAccentForeground: "oklch(0.25 0.1 25)",
    sidebarRing: "oklch(0.65 0.3 25)",
    chart1: "oklch(0.65 0.3 25)",
    chart2: "oklch(0.7 0.3 0)",
    chart3: "oklch(0.75 0.3 50)",
    chart4: "oklch(0.7 0.3 75)",
    chart5: "oklch(0.75 0.3 100)",
    // Dark mode variants
    darkPrimary: "oklch(0.75 0.3 25)",
    darkPrimaryForeground: "oklch(0.1 0 0)",
    darkSecondary: "oklch(0.35 0.05 25)",
    darkSecondaryForeground: "oklch(0.985 0 0)",
    darkAccent: "oklch(0.4 0.1 25)",
    darkAccentForeground: "oklch(0.985 0 0)",
    darkRing: "oklch(0.75 0.3 25)",
    darkSidebarPrimary: "oklch(0.75 0.3 25)",
    darkSidebarPrimaryForeground: "oklch(0.985 0 0)",
    darkSidebarAccent: "oklch(0.35 0.05 25)",
    darkSidebarAccentForeground: "oklch(0.985 0 0)",
    darkSidebarRing: "oklch(0.75 0.3 25)",
    darkChart1: "oklch(0.75 0.3 25)",
    darkChart2: "oklch(0.8 0.3 0)",
    darkChart3: "oklch(0.85 0.3 50)",
    darkChart4: "oklch(0.8 0.3 75)",
    darkChart5: "oklch(0.85 0.3 100)",
  },
};

export type ColorScheme = keyof typeof COLOR_SCHEMES;

interface ThemeContextProps {
  colorScheme: ColorScheme;
  setColorScheme: (colorScheme: ColorScheme) => void;
  availableColorSchemes: ColorScheme[];
}

const ThemeContext = createContext<ThemeContextProps>({
  colorScheme: "blue",
  setColorScheme: () => {},
  availableColorSchemes: Object.keys(COLOR_SCHEMES) as ColorScheme[],
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const [colorScheme, setColorSchemeState] = useState<ColorScheme>("blue");
  const [mounted, setMounted] = useState(false);

  // Apply the color scheme to the document
  const applyColorScheme = (scheme: ColorScheme, isDark: boolean) => {
    if (typeof document === "undefined") return;

    const root = document.documentElement;
    const colors = COLOR_SCHEMES[scheme];

    // Apply light or dark mode colors based on the current theme
    if (isDark) {
      root.style.setProperty("--primary", colors.darkPrimary);
      root.style.setProperty(
        "--primary-foreground",
        colors.darkPrimaryForeground
      );
      root.style.setProperty("--secondary", colors.darkSecondary);
      root.style.setProperty(
        "--secondary-foreground",
        colors.darkSecondaryForeground
      );
      root.style.setProperty("--accent", colors.darkAccent);
      root.style.setProperty(
        "--accent-foreground",
        colors.darkAccentForeground
      );
      root.style.setProperty("--ring", colors.darkRing);
      root.style.setProperty("--sidebar-primary", colors.darkSidebarPrimary);
      root.style.setProperty(
        "--sidebar-primary-foreground",
        colors.darkSidebarPrimaryForeground
      );
      root.style.setProperty("--sidebar-accent", colors.darkSidebarAccent);
      root.style.setProperty(
        "--sidebar-accent-foreground",
        colors.darkSidebarAccentForeground
      );
      root.style.setProperty("--sidebar-ring", colors.darkSidebarRing);
      root.style.setProperty("--chart-1", colors.darkChart1);
      root.style.setProperty("--chart-2", colors.darkChart2);
      root.style.setProperty("--chart-3", colors.darkChart3);
      root.style.setProperty("--chart-4", colors.darkChart4);
      root.style.setProperty("--chart-5", colors.darkChart5);
    } else {
      root.style.setProperty("--primary", colors.primary);
      root.style.setProperty("--primary-foreground", colors.primaryForeground);
      root.style.setProperty("--secondary", colors.secondary);
      root.style.setProperty(
        "--secondary-foreground",
        colors.secondaryForeground
      );
      root.style.setProperty("--accent", colors.accent);
      root.style.setProperty("--accent-foreground", colors.accentForeground);
      root.style.setProperty("--ring", colors.ring);
      root.style.setProperty("--sidebar-primary", colors.sidebarPrimary);
      root.style.setProperty(
        "--sidebar-primary-foreground",
        colors.sidebarPrimaryForeground
      );
      root.style.setProperty("--sidebar-accent", colors.sidebarAccent);
      root.style.setProperty(
        "--sidebar-accent-foreground",
        colors.sidebarAccentForeground
      );
      root.style.setProperty("--sidebar-ring", colors.sidebarRing);
      root.style.setProperty("--chart-1", colors.chart1);
      root.style.setProperty("--chart-2", colors.chart2);
      root.style.setProperty("--chart-3", colors.chart3);
      root.style.setProperty("--chart-4", colors.chart4);
      root.style.setProperty("--chart-5", colors.chart5);
    }
  };

  // Set the color scheme and save it to localStorage
  const setColorScheme = (scheme: ColorScheme) => {
    if (typeof window === "undefined") return;

    setColorSchemeState(scheme);
    localStorage.setItem("color-scheme", scheme);

    // Apply the color scheme immediately
    const isDark =
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    applyColorScheme(scheme, isDark);
  };

  // Initialize the color scheme from localStorage
  useEffect(() => {
    setMounted(true);

    if (typeof window === "undefined") return;

    const savedColorScheme = localStorage.getItem(
      "color-scheme"
    ) as ColorScheme | null;
    if (
      savedColorScheme &&
      Object.keys(COLOR_SCHEMES).includes(savedColorScheme)
    ) {
      setColorSchemeState(savedColorScheme);
    }
  }, []);

  // Apply the color scheme when the theme or colorScheme changes
  useEffect(() => {
    if (!mounted || typeof window === "undefined") return;

    const isDark =
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    applyColorScheme(colorScheme, isDark);

    // Listen for system theme changes if using system theme
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () =>
        applyColorScheme(colorScheme, mediaQuery.matches);

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme, colorScheme, mounted]);

  return (
    <ThemeContext.Provider
      value={{
        colorScheme,
        setColorScheme,
        availableColorSchemes: Object.keys(COLOR_SCHEMES) as ColorScheme[],
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useColorScheme = () => useContext(ThemeContext);
