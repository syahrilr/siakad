"use client";

import Link from "next/link";
import type React from "react";
import { useEffect, useRef, useState } from "react";

import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  ChevronLeft,
  ClipboardList,
  Download,
  FileText,
  Laptop,
  Maximize2,
  MessageSquare,
  Minimize2,
  MoreHorizontal,
  Pause,
  Play,
  Settings,
  Share2,
  Sidebar,
  Star,
  Video,
  Volume2,
  VolumeX,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { courseData } from "@/lib/course-data";
import type { Course, Lesson, Resource, Section } from "@/lib/course-types";
import { cn } from "@/lib/utils";

interface CourseLessonPageProps {
  courseCode: string;
}

export default function CourseLessonPage({
  courseCode,
}: CourseLessonPageProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(100);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
        document.documentElement.style.setProperty("--sidebar-width", "85vw");
      } else if (window.innerWidth < 1024) {
        setSidebarOpen(false);
        document.documentElement.style.setProperty("--sidebar-width", "320px");
      } else if (window.innerWidth < 1536) {
        setSidebarOpen(true);
        document.documentElement.style.setProperty("--sidebar-width", "350px");
      } else {
        setSidebarOpen(true);
        document.documentElement.style.setProperty("--sidebar-width", "400px");
      }
    };

    // Add transition styles for the sidebar
    const style = document.createElement("style");
    style.innerHTML = `
      aside {
        transition: transform 0.3s ease-in-out, width 0.3s ease-in-out;
      }
    `;
    document.head.appendChild(style);

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
      document.head.removeChild(style);
    };
  }, []);

  // Get course data based on courseCode
  const course: Course = courseData[courseCode] || {
    title: "Course Not Found",
    instructor: "",
    progress: 0,
    rating: 0,
    totalStudents: 0,
    lastUpdated: "",
    sections: [],
    currentLesson: {
      title: "",
      description: "This course was not found. Please check the course code.",
      resources: [],
    },
  };

  // Course sections and lessons
  const sections: Section[] = course.sections || [];

  // Current lesson
  const currentLesson = course.currentLesson || {
    title: "",
    description: "",
    resources: [],
  };

  // Find all lessons in a flat array
  const allLessons: Lesson[] = sections.flatMap((section) => section.lessons);

  const currentIndex = allLessons.findIndex((lesson) => lesson.isCurrent);

  // Previous and next lessons
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  // Video player controls
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (videoContainerRef.current) {
      if (!document.fullscreenElement) {
        videoContainerRef.current.requestFullscreen().catch((err) => {
          console.error(
            `Error attempting to enable fullscreen: ${err.message}`
          );
        });
        setIsFullscreen(true);
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Handle video time updates
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  // Handle video metadata loaded
  const handleMetadataLoaded = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  // Handle progress bar click
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const progressBar = e.currentTarget;
      const rect = progressBar.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = pos * duration;
    }
  };

  // Calculate completed lessons percentage
  const completedLessons = allLessons.filter(
    (lesson) => lesson.isCompleted
  ).length;
  const completionPercentage = Math.round(
    (completedLessons / allLessons.length) * 100
  );

  // Get instructor initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  // Render the sidebar content
  const SidebarContent = () => (
    <div className="flex h-[calc(100%-3.5rem)] flex-col">
      {/* Sidebar header with progress */}
      <div className="border-b p-3 sm:p-4">
        <div className="flex flex-col space-y-3">
          {/* Progress bar section */}
          <div>
            <div className="mb-1.5 flex items-center justify-between text-xs sm:text-sm">
              <span className="text-muted-foreground font-medium">
                Progress Kursus
              </span>
              <span className="text-primary font-semibold">
                {course.progress}%
              </span>
            </div>
            <Progress value={course.progress} className="h-1.5 sm:h-2" />
          </div>

          {/* Course stats */}
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <div className="flex items-center gap-1.5">
              <BookOpen className="text-muted-foreground h-3 w-3 sm:h-4 sm:w-4" />
              <span className="text-muted-foreground">
                {allLessons.length} Pelajaran
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="text-muted-foreground h-3 w-3 sm:h-4 sm:w-4" />
              <span className="text-muted-foreground">
                {completedLessons} Selesai
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable course content */}
      <ScrollArea className="flex-1 px-0.5">
        <Accordion
          type="multiple"
          defaultValue={sections.map((s) => s.id.toString())}
          className="w-full"
        >
          {sections.map((section: Section) => (
            <AccordionItem
              key={section.id}
              value={section.id.toString()}
              className="border-b last:border-b-0"
            >
              <AccordionTrigger className="hover:bg-muted/50 px-3 py-2 text-sm transition-colors sm:px-4 sm:py-3 sm:text-base">
                <div className="flex w-full items-center gap-2 pr-2 text-left">
                  <div className="flex-1 truncate font-medium">
                    {section.title}
                  </div>
                  {section.isCompleted && (
                    <Badge
                      variant="outline"
                      className="ml-1 h-5 bg-green-100 px-1.5 py-0 text-[10px] whitespace-nowrap text-green-700 sm:text-xs dark:bg-green-900/30 dark:text-green-400"
                    >
                      <Check className="mr-1 h-2.5 w-2.5" />
                      Selesai
                    </Badge>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-1 pb-0">
                <div className="space-y-0.5">
                  {section.lessons.map((lesson: Lesson) => (
                    <div
                      key={lesson.id}
                      className={`hover:bg-muted/80 flex cursor-pointer items-center gap-2 border-l-2 px-3 py-2 transition-colors sm:gap-3 sm:px-4 sm:py-2.5 ${
                        lesson.isCurrent
                          ? "border-l-primary bg-muted"
                          : "border-l-transparent"
                      }`}
                    >
                      <div
                        className={`flex items-center justify-center rounded-full p-1 sm:p-1.5 ${
                          lesson.isCompleted
                            ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                            : lesson.isCurrent
                              ? "bg-primary/10 text-primary"
                              : "bg-muted-foreground/20 text-muted-foreground"
                        }`}
                      >
                        {lesson.isCompleted ? (
                          <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                        ) : lesson.type === "video" ? (
                          <Video className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                        ) : lesson.type === "quiz" ? (
                          <FileText className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                        ) : lesson.type === "assignment" ? (
                          <ClipboardList className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                        ) : (
                          <Laptop className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-xs leading-tight font-medium sm:text-sm">
                          {lesson.title}
                        </div>
                        <div className="text-muted-foreground mt-0.5 flex items-center gap-1 text-[10px] sm:text-xs">
                          {lesson.type === "video" ? (
                            <>
                              <Video className="h-2.5 w-2.5" />
                              <span>{lesson.duration}</span>
                            </>
                          ) : lesson.type === "quiz" ? (
                            <>
                              <FileText className="h-2.5 w-2.5" />
                              <span>{lesson.duration}</span>
                            </>
                          ) : lesson.type === "assignment" ? (
                            <>
                              <ClipboardList className="h-2.5 w-2.5" />
                              <span>{lesson.duration}</span>
                            </>
                          ) : (
                            <>
                              <Laptop className="h-2.5 w-2.5" />
                              <span>{lesson.duration}</span>
                            </>
                          )}
                        </div>
                      </div>
                      {lesson.isCurrent && (
                        <Badge
                          variant="secondary"
                          className="text-primary ml-1 h-4 px-1.5 py-0 text-[9px] font-medium whitespace-nowrap sm:h-5 sm:text-[10px]"
                        >
                          Sedang diputar
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ScrollArea>
    </div>
  );

  return (
    <div className="bg-background flex min-h-screen flex-col">
      {/* Top navigation */}
      <header
        className={cn(
          "bg-sidebar sticky top-2 z-40 flex h-14 shrink-0 items-center justify-between rounded-lg border px-4 shadow-sm backdrop-blur-md",
          sidebarOpen
            ? "sm:w-[calc(100%-var(--sidebar-width)-10rem)]"
            : "sm:w-[calc(100%-2rem)]",
          "mx-2"
        )}
      >
        <div className="flex flex-1 items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/e-learning">
              <ArrowLeft className="size-5" />
              <span className="sr-only">Back to courses</span>
            </Link>
          </Button>
          <div className="hidden min-w-0 flex-1 sm:block">
            <h1 className="truncate text-lg font-semibold">{course.title}</h1>
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <span className="max-w-[200px] truncate">
                {course.instructor}
              </span>
              <span>•</span>
              <div className="flex items-center">
                <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{course.rating}</span>
              </div>
            </div>
          </div>
          <div className="min-w-0 flex-1 sm:hidden">
            <h1 className="truncate text-sm font-medium">{course.title}</h1>
          </div>
        </div>
        <div className="flex items-center">
          <div className="hidden items-center gap-2 md:flex">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MessageSquare className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Diskusi</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Share2 className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Bagikan</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="size-5" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Check className="mr-2 h-4 w-4" />
                <span>Tandai sebagai selesai</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Star className="mr-2 h-4 w-4" />
                <span>Tambahkan ke favorit</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="md:hidden">
                <MessageSquare className="mr-2 h-4 w-4" />
                <span>Diskusi</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="md:hidden">
                <Share2 className="mr-2 h-4 w-4" />
                <span>Bagikan</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="md:hidden" />
              <DropdownMenuItem onClick={toggleSidebar} className="md:hidden">
                <Sidebar className="mr-2 size-4 rotate-180" />
                <span>Lihat Kurikulum</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="md:hidden" />
              <DropdownMenuItem>
                <FileText className="mr-2 h-4 w-4" />
                <span>Laporkan masalah</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="hidden items-center md:flex">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                    <Sidebar className="size-5 rotate-180" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Sidebar</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="container mx-auto mt-4 flex w-full flex-1 overflow-hidden px-2 sm:mt-6 sm:px-4 md:mt-10">
        {/* Video player and content */}
        <div
          className={`flex flex-1 flex-col overflow-y-auto ${sidebarOpen ? "md:mr-80" : ""}`}
        >
          {/* Video player */}
          <div
            ref={videoContainerRef}
            className="relative aspect-video w-full bg-black"
          >
            <video
              ref={videoRef}
              className="h-full w-full object-contain"
              poster="/placeholder.svg?height=720&width=1280"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleMetadataLoaded}
              onClick={togglePlay}
            >
              <source src="#" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {!isPlaying && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute inset-0 m-auto h-16 w-16 rounded-full bg-black/50 text-white hover:bg-black/70 sm:h-20 sm:w-20"
                onClick={togglePlay}
              >
                <Play className="h-8 w-8 sm:h-10 sm:w-10" />
              </Button>
            )}

            {/* Video controls */}
            <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/80 to-transparent p-2 sm:p-4">
              <div className="mb-2">
                <div
                  className="relative h-1.5 w-full cursor-pointer rounded-full bg-white/30 sm:h-2"
                  onClick={handleProgressClick}
                >
                  <div
                    className="bg-primary absolute h-full rounded-full"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-white"
                    onClick={togglePlay}
                  >
                    {isPlaying ? (
                      <Pause className="size-5" />
                    ) : (
                      <Play className="size-5" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-white"
                    onClick={toggleMute}
                  >
                    {isMuted ? (
                      <VolumeX className="size-5" />
                    ) : (
                      <Volume2 className="size-5" />
                    )}
                  </Button>
                  <span className="text-xs text-white sm:text-sm">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hidden h-8 w-8 text-white sm:flex"
                  >
                    <Settings className="size-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-white"
                    onClick={toggleFullscreen}
                  >
                    {isFullscreen ? (
                      <Minimize2 className="size-5" />
                    ) : (
                      <Maximize2 className="size-5" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Lesson content */}
          <div className="container mx-auto flex-1 px-2 py-4 sm:px-4 sm:py-6">
            {/* Course info card */}
            <Card className="mb-4 sm:mb-6">
              <CardContent className="p-3 sm:p-4 md:p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Avatar className="h-10 w-10 border sm:h-12 sm:w-12 md:h-16 md:w-16">
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${course.instructor}`}
                      alt={course.instructor}
                    />
                    <AvatarFallback>
                      {getInitials(course.instructor)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <h2 className="truncate text-lg font-bold sm:text-xl md:text-2xl">
                      {currentLesson.title}
                    </h2>
                    <div className="mt-1 flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
                      <div className="text-muted-foreground flex items-center gap-1 text-xs sm:text-sm">
                        <BookOpen className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="truncate">{course.title}</span>
                      </div>
                      <div className="text-muted-foreground hidden sm:block">
                        •
                      </div>
                      <div className="text-muted-foreground flex items-center gap-1 text-xs sm:text-sm">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 sm:h-4 sm:w-4" />
                        <span>
                          {course.rating} ({course.totalStudents} siswa)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <Separator className="my-3 sm:my-4" />
                <p className="text-muted-foreground text-xs sm:text-sm md:text-base">
                  {currentLesson.description}
                </p>
              </CardContent>
            </Card>

            <Tabs defaultValue="overview" className="mb-6 sm:mb-8">
              <TabsList className="grid w-full grid-cols-2 md:inline-flex md:w-auto">
                <TabsTrigger value="overview" className="text-sm sm:text-base">
                  Ringkasan
                </TabsTrigger>
                <TabsTrigger value="resources" className="text-sm sm:text-base">
                  Sumber
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="mb-4 text-lg font-medium">
                      Tentang Pelajaran Ini
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Pelajaran ini merupakan bagian dari modul{" "}
                      {sections.find((s) => s.lessons.some((l) => l.isCurrent))
                        ?.title || "Kursus"}
                      . Setelah mempelajari materi ini, Anda diharapkan dapat:
                    </p>
                    <ul className="text-muted-foreground ml-6 list-disc space-y-2">
                      <li>
                        Memahami konsep dasar{" "}
                        {currentLesson.title.toLowerCase()}
                      </li>
                      <li>Mengidentifikasi karakteristik dan penerapannya</li>
                      <li>Membuat contoh implementasi sederhana</li>
                      <li>Menerapkan konsep dalam pemecahan masalah</li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="resources" className="mt-6">
                <div className="space-y-4">
                  {currentLesson.resources.length > 0 ? (
                    currentLesson.resources.map(
                      (resource: Resource, index: number) => (
                        <Card key={index} className="overflow-hidden">
                          <CardContent className="p-0">
                            <div className="hover:bg-muted/50 flex items-center justify-between p-4 transition-colors">
                              <div className="flex items-center gap-3">
                                <div className="bg-primary/10 text-primary rounded-lg p-2">
                                  {resource.type === "pdf" ? (
                                    <FileText className="size-5" />
                                  ) : resource.type === "zip" ? (
                                    <FileText className="size-5" />
                                  ) : (
                                    <FileText className="size-5" />
                                  )}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="truncate font-medium">
                                    {resource.title}
                                  </p>
                                  <p className="text-muted-foreground text-xs">
                                    {resource.type.toUpperCase()} •{" "}
                                    {resource.size}
                                  </p>
                                </div>
                              </div>
                              <Button variant="outline" size="sm">
                                <Download className="mr-2 h-4 w-4" />
                                <span className="hidden sm:inline">Unduh</span>
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    )
                  ) : (
                    <Card className="border-dashed">
                      <CardContent className="p-8 text-center">
                        <FileText className="text-muted-foreground/60 mx-auto h-10 w-10" />
                        <p className="text-muted-foreground mt-2">
                          Tidak ada sumber belajar untuk pelajaran ini.
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            {/* Lesson navigation */}
            <div className="mt-4 flex items-center justify-between sm:mt-6">
              {prevLesson ? (
                <Button
                  variant="outline"
                  className="flex h-auto items-center gap-1 px-3 py-2 sm:gap-2 sm:px-4"
                >
                  <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                  <div className="text-left">
                    <div className="text-muted-foreground text-[10px] sm:text-xs">
                      Sebelumnya
                    </div>
                    <div className="xs:max-w-[100px] max-w-[80px] truncate text-xs font-medium sm:max-w-[120px] sm:text-sm md:max-w-[200px]">
                      {prevLesson.title}
                    </div>
                  </div>
                </Button>
              ) : (
                <div></div>
              )}

              {nextLesson && (
                <Button className="flex h-auto items-center gap-1 px-3 py-2 sm:gap-2 sm:px-4">
                  <div className="text-right">
                    <div className="text-[10px] text-white/70 sm:text-xs">
                      Selanjutnya
                    </div>
                    <div className="xs:max-w-[100px] max-w-[80px] truncate text-xs font-medium sm:max-w-[120px] sm:text-sm md:max-w-[200px]">
                      {nextLesson.title}
                    </div>
                  </div>
                  <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar - Course curriculum (desktop) */}
      {sidebarOpen && (
        <aside
          className={cn(
            "bg-sidebar text-sidebar-foreground h-[calc(100svh-1rem)] flex-none rounded-lg border shadow-sm backdrop-blur-md transition-all duration-300",
            "fixed top-2 right-2 z-40 overflow-hidden",
            sidebarOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex h-14 items-center justify-between border-b px-4">
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <BookOpen className="text-primary h-4 w-4 shrink-0" />
              <h3 className="truncate text-base font-semibold sm:text-lg">
                Kurikulum Kursus
              </h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="block size-8 shrink-0 items-center justify-center md:hidden"
            >
              <ChevronLeft className="size-4" />
            </Button>
          </div>
          <SidebarContent />
        </aside>
      )}
    </div>
  );
}

// Helper function to format time (seconds to MM:SS)
function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}
