"use client";

import { useEffect } from "react";

import {
  COLOR_SCHEMES,
  type ColorScheme,
} from "@/components/globals/theme/theme-provider";

export function ThemeInitializer() {
  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined" || typeof document === "undefined")
      return;

    // Apply saved color scheme on initial load
    const savedColorScheme = localStorage.getItem(
      "color-scheme"
    ) as ColorScheme | null;

    if (
      savedColorScheme &&
      Object.keys(COLOR_SCHEMES).includes(savedColorScheme)
    ) {
      // Determine if dark mode is active
      const isDark =
        document.documentElement.classList.contains("dark") ||
        (window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches);

      // Get the root element
      const root = document.documentElement;
      const colors = COLOR_SCHEMES[savedColorScheme];

      // Apply the appropriate colors based on light/dark mode
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
        root.style.setProperty(
          "--primary-foreground",
          colors.primaryForeground
        );
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
    }
  }, []);

  return null;
}
