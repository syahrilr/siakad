"use client";

import { useEffect, useState } from "react";

import { Bell, Check, Moon, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";

import {
  COLOR_SCHEMES,
  type ColorScheme,
  useColorScheme,
} from "@/components/globals/theme/theme-provider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function SettingsPage() {
  const { setTheme, theme } = useTheme();
  const { colorScheme, setColorScheme, availableColorSchemes } =
    useColorScheme();
  const { open, setOpen } = useSidebar();
  const [activeTab, setActiveTab] = useState("appearance");
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Ensure we're mounted before accessing theme
  useEffect(() => {
    setMounted(true);
  }, []);

  // Save sidebar state to cookie when changed
  const toggleSidebar = () => {
    setOpen(!open);
    // The sidebar component already handles saving to cookie
  };

  // Color schemes for display
  const colorSchemes = availableColorSchemes.map((scheme) => ({
    name: scheme.charAt(0).toUpperCase() + scheme.slice(1),
    value: scheme,
    primaryColor: COLOR_SCHEMES[scheme].primary,
    bgColor: "white",
    textColor: "black",
  }));

  // Font size options
  const fontSizeOptions = [
    { value: "small", label: "Small" },
    { value: "medium", label: "Medium" },
    { value: "large", label: "Large" },
  ];

  // Language options
  const languageOptions = [
    { value: "english", label: "English" },
    { value: "indonesian", label: "Indonesian" },
  ];

  if (!mounted) {
    return null;
  }

  return (
    <div className="container mx-auto mt-10 space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Pengaturan</h2>
        <p className="text-muted-foreground">
          Kelola pengaturan dan preferensi akun Anda.
        </p>
      </div>

      <Tabs
        defaultValue="appearance"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="appearance">
            <Sun className="mr-2 h-4 w-4" />
            Tampilan
          </TabsTrigger>
          <TabsTrigger value="account">
            <User className="mr-2 h-4 w-4" />
            Akun
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4" />
            Notifikasi
          </TabsTrigger>
        </TabsList>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Theme</CardTitle>
              <CardDescription>Manage your theme preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Theme Mode</Label>
                <div className="flex items-center gap-2">
                  <Button
                    variant={theme === "light" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTheme("light")}
                    className="gap-1"
                  >
                    <Sun className="h-4 w-4" />
                    Light
                    {theme === "light" && <Check className="ml-1 h-3 w-3" />}
                  </Button>
                  <Button
                    variant={theme === "dark" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTheme("dark")}
                    className="gap-1"
                  >
                    <Moon className="h-4 w-4" />
                    Dark
                    {theme === "dark" && <Check className="ml-1 h-3 w-3" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Color Scheme</Label>
                <RadioGroup
                  value={colorScheme}
                  onValueChange={(value) =>
                    setColorScheme(value as ColorScheme)
                  }
                  className="grid grid-cols-2 gap-4 md:grid-cols-5"
                >
                  {colorSchemes.map((scheme) => (
                    <div key={scheme.value}>
                      <RadioGroupItem
                        value={scheme.value}
                        id={scheme.value}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={scheme.value}
                        className="border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary flex flex-col items-center justify-between rounded-md border-2 p-4"
                      >
                        <div
                          className="mb-3 h-10 w-10 rounded-full"
                          style={{ backgroundColor: scheme.primaryColor }}
                        />
                        {scheme.name}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sidebar</CardTitle>
              <CardDescription>
                Customize your sidebar preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sidebar-expanded">Expanded Sidebar</Label>
                  <p className="text-muted-foreground text-sm">
                    Keep the sidebar expanded by default when the page loads
                  </p>
                </div>
                <Switch
                  id="sidebar-expanded"
                  checked={open}
                  onCheckedChange={toggleSidebar}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sidebar-mobile">Show Sidebar on Mobile</Label>
                  <p className="text-muted-foreground text-sm">
                    Automatically open the sidebar when viewing on mobile
                    devices
                  </p>
                </div>
                <Switch id="sidebar-mobile" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Akun</CardTitle>
              <CardDescription>Perbarui informasi akun Anda.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Lengkap</Label>
                  <Input id="name" defaultValue="muehehe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue="muehehe@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nim">NIM/NIP</Label>
                  <Input id="nim" defaultValue="d891891819" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Peran</Label>
                  <Input id="role" defaultValue="Mahasiswa" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Change your password.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Update Password</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Danger Zone</CardTitle>
              <CardDescription>
                Permanently delete your account and all your data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="destructive" className="mt-2">
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Manage how you receive notifications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notifications">Push Notifications</Label>
                  <p className="text-muted-foreground text-sm">
                    Receive notifications in the application
                  </p>
                </div>
                <Switch
                  id="notifications"
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">
                    Email Notifications
                  </Label>
                  <p className="text-muted-foreground text-sm">
                    Receive notifications via email
                  </p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notification Types</CardTitle>
              <CardDescription>
                Select which types of notifications you want to receive.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Academic Updates</Label>
                  <p className="text-muted-foreground text-sm">
                    Notifications about grades, assignments, etc.
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Financial Updates</Label>
                  <p className="text-muted-foreground text-sm">
                    Notifications about payments, due dates, etc.
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>System Announcements</Label>
                  <p className="text-muted-foreground text-sm">
                    Important system-wide announcements
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Marketing & Promotions</Label>
                  <p className="text-muted-foreground text-sm">
                    Updates about new features and promotions
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
