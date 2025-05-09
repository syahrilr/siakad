"use client";

import type React from "react";
import { useEffect, useState } from "react";

import type { DateSelectArg, EventClickArg } from "@fullcalendar/core/index.js";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import {
  AlertCircle,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  Info,
  Layers,
  MapPin,
  Microscope,
  MoreHorizontal,
  Plus,
  Search,
  Sparkles,
  Users,
} from "lucide-react";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface Course {
  id: string;
  title: string;
  start: string;
  end: string;
  className: string;
  description: string;
  location?: string;
  lecturer?: string;
  lecturerAvatar?: string;
  lecturerInitials?: string;
  courseCode?: string;
  credits?: number;
  type?: "lecture" | "lab" | "tutorial" | "exam" | "deadline";
  status?: "registered" | "pending" | "available" | "full" | "conflict";
}

interface CourseParams {
  id: string;
  title: string;
  start: string;
  end: string;
  description: string;
  type: string;
  location: string;
  lecturer: string;
  courseCode: string;
  credits: number;
  courseType: string;
}

export function CalendarView() {
  const now = new Date();

  const getMonth = (dt: Date, add = 0) => {
    const month = dt.getMonth() + 1 + add;
    const str = (month < 10 ? "0" + month : month).toString();
    return str;
  };

  const [courses, setCourses] = useState<Course[]>([
    {
      id: "MED101",
      title: "Anatomi Manusia",
      start: now.getFullYear() + "-" + getMonth(now) + "-01T08:00:00",
      end: now.getFullYear() + "-" + getMonth(now) + "-01T09:40:00",
      className: "primary",
      description: "Pengenalan struktur tubuh manusia dan sistem organ",
      location: "Lab Anatomi 1",
      lecturer: "Dr. Surya Wijaya, Sp.B",
      lecturerAvatar: "/placeholder.svg?height=40&width=40",
      lecturerInitials: "SW",
      courseCode: "MED101",
      credits: 3,
      type: "lecture",
      status: "registered",
    },
    {
      id: "MED102",
      title: "Fisiologi Sistem Tubuh",
      start: now.getFullYear() + "-" + getMonth(now) + "-03T10:00:00",
      end: now.getFullYear() + "-" + getMonth(now) + "-03T11:40:00",
      className: "info",
      description:
        "Fungsi normal tubuh manusia pada tingkat sel, jaringan, dan organ",
      location: "Ruang 2.3",
      lecturer: "Prof. Ratna Dewi, Ph.D",
      lecturerAvatar: "/placeholder.svg?height=40&width=40",
      lecturerInitials: "RD",
      courseCode: "MED102",
      credits: 3,
      type: "lecture",
      status: "registered",
    },
    {
      id: "MED103",
      title: "Patologi Umum",
      start: now.getFullYear() + "-" + getMonth(now) + "-05T13:00:00",
      end: now.getFullYear() + "-" + getMonth(now) + "-05T14:40:00",
      className: "success",
      description: "Proses penyakit pada tingkat sel, jaringan, dan organ",
      location: "Lab Patologi",
      lecturer: "Dr. Hendra Santoso, Sp.PA",
      lecturerAvatar: "/placeholder.svg?height=40&width=40",
      lecturerInitials: "HS",
      courseCode: "MED103",
      credits: 3,
      type: "lecture",
      status: "registered",
    },
    {
      id: "MED104",
      title: "Farmakologi Dasar",
      start: now.getFullYear() + "-" + getMonth(now) + "-02T08:00:00",
      end: now.getFullYear() + "-" + getMonth(now) + "-02T09:40:00",
      className: "danger",
      description: "Prinsip dasar farmakologi dan mekanisme kerja obat",
      location: "Ruang 3.2",
      lecturer: "Dr. Siti Rahmah, Sp.FK",
      lecturerAvatar: "/placeholder.svg?height=40&width=40",
      lecturerInitials: "SR",
      courseCode: "MED104",
      credits: 3,
      type: "lecture",
      status: "available",
    },
    {
      id: "MED105",
      title: "Praktikum Anatomi",
      start: now.getFullYear() + "-" + getMonth(now) + "-04T15:00:00",
      end: now.getFullYear() + "-" + getMonth(now) + "-04T16:40:00",
      className: "info",
      description: "Praktikum identifikasi struktur anatomi pada kadaver",
      location: "Lab Anatomi 2",
      lecturer: "Dr. Surya Wijaya, Sp.B",
      lecturerAvatar: "/placeholder.svg?height=40&width=40",
      lecturerInitials: "SW",
      courseCode: "MED105",
      credits: 1,
      type: "lab",
      status: "registered",
    },
    {
      id: "MED106",
      title: "UTS Anatomi Manusia",
      start: now.getFullYear() + "-" + getMonth(now) + "-15T09:00:00",
      end: now.getFullYear() + "-" + getMonth(now) + "-15T11:00:00",
      className: "warning",
      description: "Ujian Tengah Semester Anatomi Manusia",
      location: "Gedung Kedokteran Lt. 3",
      courseCode: "MED101",
      type: "exam",
      status: "registered",
    },
    {
      id: "MED107",
      title: "Deadline Laporan Praktikum Anatomi",
      start: now.getFullYear() + "-" + getMonth(now) + "-10T23:59:00",
      end: now.getFullYear() + "-" + getMonth(now) + "-10T23:59:00",
      className: "danger",
      description:
        "Pengumpulan laporan praktikum anatomi sistem muskuloskeletal",
      courseCode: "MED105",
      type: "deadline",
      status: "registered",
    },
    {
      id: "MED108",
      title: "Mikrobiologi Kedokteran",
      start: now.getFullYear() + "-" + getMonth(now, 1) + "-05T13:00:00",
      end: now.getFullYear() + "-" + getMonth(now, 1) + "-05T14:40:00",
      className: "primary",
      description: "Karakteristik mikroorganisme patogen dan mekanisme infeksi",
      location: "Lab Mikrobiologi",
      lecturer: "Prof. Ahmad Hidayat, Ph.D",
      lecturerAvatar: "/placeholder.svg?height=40&width=40",
      lecturerInitials: "AH",
      courseCode: "MED108",
      credits: 3,
      type: "lecture",
      status: "available",
    },
  ]);

  const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false);
  const [isCourseDetailModalOpen, setIsCourseDetailModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [minStartDate, setMinStartDate] = useState<string>("");
  const [minEndDate, setMinEndDate] = useState<string>("");
  const [activeView, setActiveView] = useState("dayGridMonth");
  const [isLoading, setIsLoading] = useState(true);
  const [availableCourses, setAvailableCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [activeTab, setActiveTab] = useState("calendar");

  const defaultParams = {
    id: "",
    title: "",
    start: "",
    end: "",
    description: "",
    type: "primary",
    location: "",
    lecturer: "",
    courseCode: "",
    credits: 0,
    courseType: "lecture",
  };

  const [params, setParams] = useState<CourseParams>(defaultParams);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Initialize available courses
  useEffect(() => {
    // In a real app, this would be fetched from an API
    const sampleAvailableCourses: Course[] = [
      {
        id: "MED201",
        title: "Etika Kedokteran",
        start: now.getFullYear() + "-" + getMonth(now) + "-08T10:00:00",
        end: now.getFullYear() + "-" + getMonth(now) + "-08T11:40:00",
        className: "info",
        description:
          "Prinsip etika dalam praktik kedokteran dan penelitian medis",
        location: "Ruang Diskusi 2",
        lecturer: "Dr. Maya Indah, M.Kes",
        lecturerAvatar: "/placeholder.svg?height=40&width=40",
        lecturerInitials: "MI",
        courseCode: "MED201",
        credits: 2,
        type: "lecture",
        status: "available",
      },
      {
        id: "MED202",
        title: "Imunologi Dasar",
        start: now.getFullYear() + "-" + getMonth(now) + "-09T13:00:00",
        end: now.getFullYear() + "-" + getMonth(now) + "-09T14:40:00",
        className: "success",
        description: "Sistem imun dan mekanisme pertahanan tubuh",
        location: "Ruang 4.1",
        lecturer: "Prof. Dina Anggraini, Ph.D",
        lecturerAvatar: "/placeholder.svg?height=40&width=40",
        lecturerInitials: "DA",
        courseCode: "MED202",
        credits: 2,
        type: "lecture",
        status: "available",
      },
      {
        id: "MED203",
        title: "Biokimia Medis",
        start: now.getFullYear() + "-" + getMonth(now) + "-10T13:00:00",
        end: now.getFullYear() + "-" + getMonth(now) + "-10T14:40:00",
        className: "primary",
        description:
          "Proses biokimia dalam tubuh manusia dan implikasinya dalam kesehatan dan penyakit",
        location: "Lab Biokimia",
        lecturer: "Dr. Eko Prasetyo, M.Biomed",
        lecturerAvatar: "/placeholder.svg?height=40&width=40",
        lecturerInitials: "EP",
        courseCode: "MED203",
        credits: 3,
        type: "lecture",
        status: "available",
      },
      {
        id: "MED204",
        title: "Praktikum Mikrobiologi",
        start: now.getFullYear() + "-" + getMonth(now) + "-11T15:00:00",
        end: now.getFullYear() + "-" + getMonth(now) + "-11T16:40:00",
        className: "primary",
        description: "Praktikum identifikasi mikroorganisme patogen",
        location: "Lab Mikrobiologi",
        lecturer: "Prof. Ahmad Hidayat, Ph.D",
        lecturerAvatar: "/placeholder.svg?height=40&width=40",
        lecturerInitials: "AH",
        courseCode: "MED204",
        credits: 1,
        type: "lab",
        status: "available",
      },
    ];
    setAvailableCourses(sampleAvailableCourses);
  }, []);

  const dateFormat = (dt: string | number | Date) => {
    dt = new Date(dt);
    const month =
      dt.getMonth() + 1 < 10 ? "0" + (dt.getMonth() + 1) : dt.getMonth() + 1;
    const date = dt.getDate() < 10 ? "0" + dt.getDate() : dt.getDate();
    const hours = dt.getHours() < 10 ? "0" + dt.getHours() : dt.getHours();
    const mins = dt.getMinutes() < 10 ? "0" + dt.getMinutes() : dt.getMinutes();
    dt = dt.getFullYear() + "-" + month + "-" + date + "T" + hours + ":" + mins;
    return dt;
  };

  const openCourseDetail = (courseId: string) => {
    const course = [...courses, ...availableCourses].find(
      (c) => c.id === courseId
    );
    if (course) {
      setSelectedCourse(course);
      setIsCourseDetailModalOpen(true);
    }
  };

  const addNewCourse = () => {
    setParams(defaultParams);
    setMinStartDate(new Date().toISOString().slice(0, 16));
    setMinEndDate(new Date().toISOString().slice(0, 16));
    setIsAddCourseModalOpen(true);
  };

  const editCourse = (data: EventClickArg) => {
    if (data) {
      const obj = JSON.parse(JSON.stringify(data.event));
      const course = [...courses, ...availableCourses].find(
        (c) => c.id === obj.id
      );

      if (course) {
        setSelectedCourse(course);
        setIsCourseDetailModalOpen(true);
      } else {
        setParams({
          id: obj.id || "",
          title: obj.title || "",
          start: dateFormat(obj.start),
          end: dateFormat(obj.end),
          type: obj.classNames ? obj.classNames[0] : "primary",
          description: obj.extendedProps ? obj.extendedProps.description : "",
          location: obj.extendedProps ? obj.extendedProps.location : "",
          lecturer: obj.extendedProps ? obj.extendedProps.lecturer : "",
          courseCode: obj.extendedProps ? obj.extendedProps.courseCode : "",
          credits: obj.extendedProps ? obj.extendedProps.credits : 0,
          courseType: obj.extendedProps ? obj.extendedProps.type : "lecture",
        });
        setMinStartDate(new Date().toISOString().slice(0, 16));
        setMinEndDate(dateFormat(obj.start));
        setIsAddCourseModalOpen(true);
      }
    }
  };

  const editDate = (data: DateSelectArg) => {
    setParams({
      ...defaultParams,
      start: dateFormat(data.start),
      end: dateFormat(data.end),
    });

    setMinStartDate(new Date().toISOString().slice(0, 16));
    setMinEndDate(dateFormat(data.start));
    setIsAddCourseModalOpen(true);
  };

  const saveCourse = () => {
    if (!params.title) {
      toast.error("Terjadi Kesalahan", {
        description: "Nama mata kuliah harus diisi",
        richColors: true,
      });
      return true;
    }

    if (!params.start) {
      toast.error("Terjadi Kesalahan", {
        description: "Waktu mulai harus diisi",
        richColors: true,
      });
      return true;
    }

    if (!params.end) {
      toast.error("Terjadi Kesalahan", {
        description: "Waktu selesai harus diisi",
        richColors: true,
      });
      return true;
    }

    if (!params.courseCode) {
      toast.error("Terjadi Kesalahan", {
        description: "Kode mata kuliah harus diisi",
        richColors: true,
      });
      return true;
    }

    if (params.id) {
      // Update course
      const updatedCourses = [...courses];
      const courseIndex = updatedCourses.findIndex((c) => c.id === params.id);

      if (courseIndex !== -1) {
        updatedCourses[courseIndex] = {
          ...updatedCourses[courseIndex],
          title: params.title,
          start: params.start,
          end: params.end,
          description: params.description,
          className: params.type,
          location: params.location,
          lecturer: params.lecturer,
          courseCode: params.courseCode,
          credits: params.credits,
          type: params.courseType as Course["type"],
        };

        setCourses(updatedCourses);
      }
    } else {
      // Add new course
      const newCourse: Course = {
        id: params.courseCode,
        title: params.title,
        start: params.start,
        end: params.end,
        description: params.description,
        className: params.type,
        location: params.location,
        lecturer: params.lecturer,
        courseCode: params.courseCode,
        credits: params.credits,
        type: params.courseType as Course["type"],
        status: "registered",
      };

      setCourses([...courses, newCourse]);
    }
    toast.success(
      params.id ? "Mata Kuliah Diperbarui" : "Mata Kuliah Ditambahkan",
      {
        description: params.id
          ? `${params.title} telah berhasil diperbarui.`
          : `${params.title} telah berhasil ditambahkan ke jadwal Anda.`,
        richColors: true,
      }
    );

    setIsAddCourseModalOpen(false);
  };

  const registerCourse = (course: Course) => {
    // Check for time conflicts
    const hasConflict = courses.some((c) => {
      const courseStart = new Date(course.start);
      const courseEnd = new Date(course.end);
      const existingStart = new Date(c.start);
      const existingEnd = new Date(c.end);

      // Check if the day of week is the same
      if (courseStart.getDay() !== existingStart.getDay()) {
        return false;
      }

      // Check for time overlap
      return (
        (courseStart >= existingStart && courseStart < existingEnd) ||
        (courseEnd > existingStart && courseEnd <= existingEnd) ||
        (courseStart <= existingStart && courseEnd >= existingEnd)
      );
    });

    if (hasConflict) {
      toast.error("Konflik Jadwal", {
        description:
          "Mata kuliah ini bertabrakan dengan jadwal yang sudah ada.",
        richColors: true,
      });
      return;
    }

    // Add course to registered courses
    const updatedCourse = { ...course, status: "registered" };
    setCourses([
      ...courses,
      { ...updatedCourse, status: "registered" as Course["status"] },
    ]);

    // Remove from available courses
    setAvailableCourses(availableCourses.filter((c) => c.id !== course.id));
    toast.success("Mata Kuliah Terdaftar", {
      description: `Anda telah berhasil mendaftar untuk ${course.title}.`,
      richColors: true,
    });

    setIsCourseDetailModalOpen(false);
  };

  const dropCourse = (courseId: string) => {
    const course = courses.find((c) => c.id === courseId);

    if (!course) {
      return;
    }

    // Remove from registered courses
    setCourses(courses.filter((c) => c.id !== courseId));

    // If it's an available course, add it back to available courses
    if (
      course.status === "registered" &&
      !availableCourses.some((c) => c.id === courseId)
    ) {
      const updatedCourse = { ...course, status: "available" };
      setAvailableCourses([
        ...availableCourses,
        { ...updatedCourse, status: "available" as Course["status"] },
      ]);
    }
    toast.success("Mata Kuliah Dibatalkan", {
      description: `Anda telah membatalkan ${course.title}.`,
      richColors: true,
    });

    setIsCourseDetailModalOpen(false);
  };

  const startDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const dateStr = event.target.value;
    if (dateStr) {
      setMinEndDate(dateFormat(dateStr));
      setParams({ ...params, start: dateStr, end: "" });
    }
  };

  const changeValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, id } = e.target;
    setParams({ ...params, [id]: value });
  };

  const getEventBadgeClass = (className: string) => {
    switch (className) {
      case "primary":
        return "bg-primary text-primary-foreground";
      case "info":
        return "bg-blue-500 text-white";
      case "success":
        return "bg-green-500 text-white";
      case "danger":
        return "bg-red-500 text-white";
      case "warning":
        return "bg-amber-500 text-white";
      default:
        return "bg-primary text-primary-foreground";
    }
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case "lecture":
        return <BookOpen className="h-4 w-4" />;
      case "lab":
        return <Microscope className="h-4 w-4" />;
      case "tutorial":
        return <Users className="h-4 w-4" />;
      case "exam":
        return <AlertCircle className="h-4 w-4" />;
      case "deadline":
        return <Clock className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case "lecture":
        return "Kuliah";
      case "lab":
        return "Praktikum";
      case "tutorial":
        return "Tutorial";
      case "exam":
        return "Ujian";
      case "deadline":
        return "Deadline";
      default:
        return "Lainnya";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "registered":
        return (
          <Badge
            variant="outline"
            className="border-green-200 bg-green-100 text-green-700 dark:border-green-800 dark:bg-green-950/50 dark:text-green-400"
          >
            <CheckCircle className="mr-1 h-3 w-3" />
            Terdaftar
          </Badge>
        );
      case "pending":
        return (
          <Badge
            variant="outline"
            className="border-amber-200 bg-amber-100 text-amber-700 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-400"
          >
            <Clock className="mr-1 h-3 w-3" />
            Menunggu
          </Badge>
        );
      case "available":
        return (
          <Badge
            variant="outline"
            className="border-blue-200 bg-blue-100 text-blue-700 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-400"
          >
            <Plus className="mr-1 h-3 w-3" />
            Tersedia
          </Badge>
        );
      case "full":
        return (
          <Badge
            variant="outline"
            className="border-red-200 bg-red-100 text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-400"
          >
            <Users className="mr-1 h-3 w-3" />
            Penuh
          </Badge>
        );
      case "conflict":
        return (
          <Badge
            variant="outline"
            className="border-red-200 bg-red-100 text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-400"
          >
            <AlertCircle className="mr-1 h-3 w-3" />
            Konflik
          </Badge>
        );
      default:
        return null;
    }
  };

  // Filter available courses based on search and type
  const filteredAvailableCourses = availableCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.courseCode?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.lecturer?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = selectedType === "all" || course.type === selectedType;

    return matchesSearch && matchesType;
  });

  return (
    <Card className="overflow-hidden border shadow-md transition-all duration-300 hover:shadow-lg dark:border-slate-800">
      <CardHeader className="bg-card pb-3">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <CardTitle className="text-xl font-bold">
              Jadwal Perkuliahan
            </CardTitle>
            <CardDescription>Semester Genap 2023/2024</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full sm:w-auto"
            >
              <TabsList className="grid w-full grid-cols-2 sm:w-auto">
                <TabsTrigger
                  value="calendar"
                  className="flex items-center gap-1.5"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Kalender</span>
                </TabsTrigger>
                <TabsTrigger
                  value="courses"
                  className="flex items-center gap-1.5"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Mata Kuliah</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <Button
              onClick={addNewCourse}
              variant="default"
              size="sm"
              className="gap-1.5"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Tambah</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="calendar" className="mt-0 border-none p-0">
            {isLoading ? (
              <div className="flex h-[400px] items-center justify-center">
                <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
              </div>
            ) : (
              <div className="calendar-wrapper p-4">
                <style jsx global>{`
                  .fc .fc-toolbar.fc-header-toolbar {
                    margin-bottom: 1rem;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                  }

                  .fc .fc-button {
                    background-color: var(--btn-background);
                    border-color: var(--border);
                    color: var(--foreground);
                    font-weight: 500;
                    text-transform: capitalize;
                    padding: 0.4rem 0.75rem;
                    border-radius: 0.375rem;
                    font-size: 0.875rem;
                    line-height: 1.25rem;
                    box-shadow: var(--shadow-sm);
                    transition: all 0.2s ease;
                  }

                  .fc .fc-button:hover {
                    background-color: var(--accent);
                    border-color: var(--accent);
                  }

                  .fc .fc-button-primary:not(:disabled).fc-button-active,
                  .fc .fc-button-primary:not(:disabled):active {
                    background-color: var(--primary);
                    border-color: var(--primary);
                    color: var(--primary-foreground);
                  }

                  .fc .fc-daygrid-day.fc-day-today {
                    background-color: var(--accent-light);
                  }

                  .fc .fc-daygrid-day-number,
                  .fc .fc-col-header-cell-cushion {
                    color: var(--foreground);
                    text-decoration: none;
                    padding: 0.5rem;
                  }

                  .fc-theme-standard td,
                  .fc-theme-standard th,
                  .fc-theme-standard .fc-scrollgrid {
                    border-color: var(--border);
                  }

                  .fc-event {
                    cursor: pointer;
                    border-radius: 0.25rem;
                    border: none;
                    transition: transform 0.2s ease;
                  }

                  .fc-event:hover {
                    transform: translateY(-1px);
                    box-shadow: var(--shadow-md);
                  }

                  @media (max-width: 640px) {
                    .fc .fc-toolbar {
                      display: flex;
                      flex-direction: column;
                      align-items: center;
                      gap: 0.75rem;
                    }

                    .fc .fc-toolbar-chunk {
                      display: flex;
                      justify-content: center;
                    }
                  }
                `}</style>
                <FullCalendar
                  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                  initialView="dayGridMonth"
                  headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay",
                  }}
                  locale="id"
                  editable={true}
                  dayMaxEvents={true}
                  selectable={true}
                  droppable={true}
                  eventClick={(event) => editCourse(event)}
                  select={(event) => editDate(event)}
                  events={courses}
                  height="auto"
                  aspectRatio={1.8}
                  viewDidMount={(view) => setActiveView(view.view.type)}
                  eventContent={(eventInfo) => {
                    const course = courses.find(
                      (c) => c.id === eventInfo.event.id
                    );

                    return (
                      <div
                        className={cn(
                          "fc-event-main-frame flex h-full w-full flex-col overflow-hidden rounded p-1 shadow-sm transition-all duration-200 hover:shadow-md",
                          getEventBadgeClass(eventInfo.event.classNames[0])
                        )}
                      >
                        <div className="flex items-center gap-1 overflow-hidden">
                          {course?.type && (
                            <div className="flex-shrink-0">
                              {getEventTypeIcon(course.type)}
                            </div>
                          )}
                          <div className="flex-1 truncate font-medium">
                            {eventInfo.event.title}
                          </div>
                        </div>
                        {activeView !== "dayGridMonth" && (
                          <div className="mt-1 text-xs opacity-90">
                            {course?.courseCode && (
                              <div className="flex items-center gap-1">
                                <span>{course.courseCode}</span>
                                {course.credits && (
                                  <span>({course.credits} SKS)</span>
                                )}
                              </div>
                            )}
                            {course?.location && (
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                <span>{course.location}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  }}
                />
              </div>
            )}
          </TabsContent>
          <TabsContent value="courses" className="mt-0 border-none">
            <div className="p-4">
              <div className="mb-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="flex items-center gap-2 text-lg font-semibold">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Mata Kuliah Terdaftar
                    <Badge variant="outline" className="ml-2">
                      {courses.length}
                    </Badge>
                  </h3>
                  <Badge variant="secondary" className="px-2 py-1">
                    Total SKS:{" "}
                    {courses.reduce(
                      (total, course) => total + (course.credits || 0),
                      0
                    )}
                    /24
                  </Badge>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {courses.map((course) => (
                    <Card
                      key={course.id}
                      className={cn(
                        "group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md",
                        course.type === "exam" &&
                          "border-amber-200 dark:border-amber-800",
                        course.type === "deadline" &&
                          "border-red-200 dark:border-red-800"
                      )}
                    >
                      <CardHeader
                        className={cn(
                          "p-3",
                          course.type === "exam" &&
                            "bg-amber-50 dark:bg-amber-950/30",
                          course.type === "deadline" &&
                            "bg-red-50 dark:bg-red-950/30"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <Badge
                            variant="outline"
                            className={cn(
                              "flex items-center gap-1 font-medium",
                              course.type === "lecture" &&
                                "border-blue-200 bg-blue-100 text-blue-700 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-400",
                              course.type === "lab" &&
                                "border-violet-200 bg-violet-100 text-violet-700 dark:border-violet-800 dark:bg-violet-950/50 dark:text-violet-400",
                              course.type === "tutorial" &&
                                "border-emerald-200 bg-emerald-100 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400",
                              course.type === "exam" &&
                                "border-amber-200 bg-amber-100 text-amber-700 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-400",
                              course.type === "deadline" &&
                                "border-red-200 bg-red-100 text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-400"
                            )}
                          >
                            {getEventTypeIcon(course.type || "lecture")}
                            {getEventTypeLabel(course.type || "lecture")}
                          </Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => openCourseDetail(course.id)}
                              >
                                Lihat Detail
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => dropCourse(course.id)}
                              >
                                Batalkan Mata Kuliah
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4">
                        <h4 className="mb-1 line-clamp-2 text-lg font-medium">
                          {course.title}
                        </h4>
                        <div className="text-muted-foreground mb-3 flex items-center gap-2 text-sm">
                          <span className="font-medium">
                            {course.courseCode}
                          </span>
                          {course.credits && (
                            <span>({course.credits} SKS)</span>
                          )}
                        </div>
                        <div className="space-y-2 text-sm">
                          {course.lecturer && (
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage
                                  src={
                                    course.lecturerAvatar || "/placeholder.svg"
                                  }
                                  alt={course.lecturer}
                                />
                                <AvatarFallback>
                                  {course.lecturerInitials}
                                </AvatarFallback>
                              </Avatar>
                              <span>{course.lecturer}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <Clock className="text-muted-foreground h-4 w-4" />
                            <span>
                              {format(new Date(course.start), "EEEE", {
                                locale: id,
                              })}
                              , {format(new Date(course.start), "HH:mm")} -{" "}
                              {format(new Date(course.end), "HH:mm")}
                            </span>
                          </div>
                          {course.location && (
                            <div className="flex items-center gap-2">
                              <MapPin className="text-muted-foreground h-4 w-4" />
                              <span>{course.location}</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter className="bg-muted/30 flex justify-end gap-2 border-t p-3">
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1.5"
                          onClick={() => openCourseDetail(course.id)}
                        >
                          <Info className="h-4 w-4" />
                          <span>Detail</span>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                  {courses.length === 0 && (
                    <div className="col-span-full flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                      <div className="bg-muted mb-3 rounded-full p-3">
                        <Calendar className="text-muted-foreground h-6 w-6" />
                      </div>
                      <h3 className="mb-1 text-lg font-medium">
                        Belum ada mata kuliah
                      </h3>
                      <p className="text-muted-foreground mb-4 max-w-md text-sm">
                        Anda belum memilih mata kuliah untuk semester ini.
                        Silakan tambahkan mata kuliah dari daftar yang tersedia.
                      </p>
                      <Button onClick={() => setIsAddCourseModalOpen(true)}>
                        Tambah Mata Kuliah
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="flex items-center gap-2 text-lg font-semibold">
                    <Sparkles className="h-5 w-5 text-blue-500" />
                    Mata Kuliah Tersedia
                    <Badge variant="outline" className="ml-2">
                      {filteredAvailableCourses.length}
                    </Badge>
                  </h3>
                  <div className="flex items-center gap-2">
                    <Select
                      value={selectedType}
                      onValueChange={setSelectedType}
                    >
                      <SelectTrigger className="h-9 w-[130px]">
                        <SelectValue placeholder="Semua Tipe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Semua Tipe</SelectItem>
                        <SelectItem value="lecture">Kuliah</SelectItem>
                        <SelectItem value="lab">Praktikum</SelectItem>
                        <SelectItem value="tutorial">Tutorial</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="relative">
                      <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
                      <Input
                        type="search"
                        placeholder="Cari mata kuliah..."
                        className="h-9 w-[200px] pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <ScrollArea className="h-[400px] rounded-md border p-4">
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredAvailableCourses.map((course) => (
                      <Card
                        key={course.id}
                        className="group overflow-hidden transition-all duration-300 hover:shadow-md"
                      >
                        <CardHeader className="bg-blue-50/50 p-3 dark:bg-blue-950/20">
                          <div className="flex items-center justify-between">
                            <Badge
                              variant="outline"
                              className={cn(
                                "flex items-center gap-1 font-medium",
                                course.type === "lecture" &&
                                  "border-blue-200 bg-blue-100 text-blue-700 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-400",
                                course.type === "lab" &&
                                  "border-violet-200 bg-violet-100 text-violet-700 dark:border-violet-800 dark:bg-violet-950/50 dark:text-violet-400",
                                course.type === "tutorial" &&
                                  "border-emerald-200 bg-emerald-100 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400"
                              )}
                            >
                              {getEventTypeIcon(course.type || "lecture")}
                              {getEventTypeLabel(course.type || "lecture")}
                            </Badge>
                            {getStatusBadge(course.status || "available")}
                          </div>
                        </CardHeader>
                        <CardContent className="p-4">
                          <h4 className="mb-1 line-clamp-2 text-lg font-medium">
                            {course.title}
                          </h4>
                          <div className="text-muted-foreground mb-3 flex items-center gap-2 text-sm">
                            <span className="font-medium">
                              {course.courseCode}
                            </span>
                            {course.credits && (
                              <span>({course.credits} SKS)</span>
                            )}
                          </div>
                          <div className="space-y-2 text-sm">
                            {course.lecturer && (
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage
                                    src={
                                      course.lecturerAvatar ||
                                      "/placeholder.svg"
                                    }
                                    alt={course.lecturer}
                                  />
                                  <AvatarFallback>
                                    {course.lecturerInitials}
                                  </AvatarFallback>
                                </Avatar>
                                <span>{course.lecturer}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-2">
                              <Clock className="text-muted-foreground h-4 w-4" />
                              <span>
                                {format(new Date(course.start), "EEEE", {
                                  locale: id,
                                })}
                                , {format(new Date(course.start), "HH:mm")} -{" "}
                                {format(new Date(course.end), "HH:mm")}
                              </span>
                            </div>
                            {course.location && (
                              <div className="flex items-center gap-2">
                                <MapPin className="text-muted-foreground h-4 w-4" />
                                <span>{course.location}</span>
                              </div>
                            )}
                          </div>
                        </CardContent>
                        <CardFooter className="bg-muted/30 flex justify-end gap-2 border-t p-3">
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1.5"
                            onClick={() => openCourseDetail(course.id)}
                          >
                            <Info className="h-4 w-4" />
                            <span>Detail</span>
                          </Button>
                          <Button
                            size="sm"
                            className="gap-1.5"
                            onClick={() => registerCourse(course)}
                          >
                            <CheckCircle className="h-4 w-4" />
                            <span>Ambil</span>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                    {filteredAvailableCourses.length === 0 && (
                      <div className="col-span-full flex h-full flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                        <div className="bg-muted mb-3 rounded-full p-3">
                          <Search className="text-muted-foreground h-6 w-6" />
                        </div>
                        <h3 className="mb-1 text-lg font-medium">
                          Tidak ditemukan
                        </h3>
                        <p className="text-muted-foreground max-w-md text-sm">
                          Tidak ada mata kuliah yang sesuai dengan kriteria
                          pencarian Anda.
                        </p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t p-4">
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
          <div className="flex items-center gap-1">
            <div className="bg-primary h-3 w-3 rounded-full"></div>
            <span>Kuliah</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-violet-500"></div>
            <span>Praktikum</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
            <span>Tutorial</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-amber-500"></div>
            <span>Ujian</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <span>Deadline</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Layers className="text-muted-foreground h-4 w-4" />
          <span className="text-muted-foreground text-sm font-medium">
            {courses.length} Mata Kuliah •{" "}
            {courses.reduce(
              (total, course) => total + (course.credits || 0),
              0
            )}{" "}
            SKS
          </span>
        </div>
      </CardFooter>

      {/* Course Detail Modal */}
      <Dialog
        open={isCourseDetailModalOpen}
        onOpenChange={setIsCourseDetailModalOpen}
      >
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Detail Mata Kuliah</DialogTitle>
            <DialogDescription>
              Informasi lengkap tentang mata kuliah
            </DialogDescription>
          </DialogHeader>
          {selectedCourse && (
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between">
                <Badge
                  variant="outline"
                  className={cn(
                    "flex items-center gap-1 font-medium",
                    selectedCourse.type === "lecture" &&
                      "border-blue-200 bg-blue-100 text-blue-700 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-400",
                    selectedCourse.type === "lab" &&
                      "border-violet-200 bg-violet-100 text-violet-700 dark:border-violet-800 dark:bg-violet-950/50 dark:text-violet-400",
                    selectedCourse.type === "tutorial" &&
                      "border-emerald-200 bg-emerald-100 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400",
                    selectedCourse.type === "exam" &&
                      "border-amber-200 bg-amber-100 text-amber-700 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-400",
                    selectedCourse.type === "deadline" &&
                      "border-red-200 bg-red-100 text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-400"
                  )}
                >
                  {getEventTypeIcon(selectedCourse.type || "lecture")}
                  {getEventTypeLabel(selectedCourse.type || "lecture")}
                </Badge>
                {getStatusBadge(selectedCourse.status || "available")}
              </div>

              <div>
                <h3 className="text-lg font-semibold">
                  {selectedCourse.title}
                </h3>
                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                  <span className="font-medium">
                    {selectedCourse.courseCode}
                  </span>
                  {selectedCourse.credits && (
                    <span>({selectedCourse.credits} SKS)</span>
                  )}
                </div>
              </div>

              <div className="bg-muted/30 rounded-lg border p-4">
                <div className="mb-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-muted-foreground text-xs">Jadwal</p>
                    <p className="font-medium">
                      {format(new Date(selectedCourse.start), "EEEE", {
                        locale: id,
                      })}
                      , {format(new Date(selectedCourse.start), "HH:mm")} -{" "}
                      {format(new Date(selectedCourse.end), "HH:mm")}
                    </p>
                  </div>
                  {selectedCourse.location && (
                    <div>
                      <p className="text-muted-foreground text-xs">Lokasi</p>
                      <p className="font-medium">{selectedCourse.location}</p>
                    </div>
                  )}
                  {selectedCourse.lecturer && (
                    <div className="col-span-2">
                      <p className="text-muted-foreground text-xs">Dosen</p>
                      <div className="mt-1 flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage
                            src={
                              selectedCourse.lecturerAvatar ||
                              "/placeholder.svg"
                            }
                            alt={selectedCourse.lecturer}
                          />
                          <AvatarFallback>
                            {selectedCourse.lecturerInitials}
                          </AvatarFallback>
                        </Avatar>
                        <p className="font-medium">{selectedCourse.lecturer}</p>
                      </div>
                    </div>
                  )}
                </div>

                {selectedCourse.description && (
                  <div>
                    <p className="text-muted-foreground text-xs">Deskripsi</p>
                    <p className="text-sm">{selectedCourse.description}</p>
                  </div>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            {selectedCourse?.status === "registered" ? (
              <Button
                variant="destructive"
                onClick={() => dropCourse(selectedCourse.id)}
              >
                Batalkan Mata Kuliah
              </Button>
            ) : selectedCourse?.status === "available" ? (
              <Button onClick={() => registerCourse(selectedCourse)}>
                Ambil Mata Kuliah
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={() => setIsCourseDetailModalOpen(false)}
              >
                Tutup
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Course Modal */}
      <Dialog
        open={isAddCourseModalOpen}
        onOpenChange={setIsAddCourseModalOpen}
      >
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>
              {params.id ? "Edit Mata Kuliah" : "Tambah Mata Kuliah"}
            </DialogTitle>
            <DialogDescription>
              {params.id
                ? "Perbarui detail mata kuliah"
                : "Tambahkan mata kuliah baru ke jadwal Anda"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 space-y-2">
                <Label htmlFor="title">Nama Mata Kuliah</Label>
                <Input
                  id="title"
                  placeholder="Masukkan nama mata kuliah"
                  value={params.title || ""}
                  onChange={changeValue}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="courseCode">Kode Mata Kuliah</Label>
                <Input
                  id="courseCode"
                  placeholder="Contoh: MED101"
                  value={params.courseCode || ""}
                  onChange={changeValue}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="credits">SKS</Label>
                <Input
                  id="credits"
                  type="number"
                  min="1"
                  max="6"
                  placeholder="Jumlah SKS"
                  value={params.credits || ""}
                  onChange={changeValue}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="start">Waktu Mulai</Label>
                <Input
                  id="start"
                  type="datetime-local"
                  value={params.start || ""}
                  min={minStartDate}
                  onChange={startDateChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="end">Waktu Selesai</Label>
                <Input
                  id="end"
                  type="datetime-local"
                  value={params.end || ""}
                  min={minEndDate}
                  onChange={changeValue}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Lokasi</Label>
                <Input
                  id="location"
                  placeholder="Ruang kelas/lab"
                  value={params.location || ""}
                  onChange={changeValue}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lecturer">Dosen</Label>
                <Input
                  id="lecturer"
                  placeholder="Nama dosen pengajar"
                  value={params.lecturer || ""}
                  onChange={changeValue}
                />
              </div>

              <div className="col-span-2 space-y-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                  id="description"
                  placeholder="Deskripsi mata kuliah"
                  value={params.description || ""}
                  onChange={changeValue}
                  className="min-h-[100px]"
                />
              </div>

              <div className="col-span-2 space-y-2">
                <Label>Tipe Mata Kuliah</Label>
                <RadioGroup
                  value={params.courseType}
                  onValueChange={(value) =>
                    setParams({ ...params, courseType: value })
                  }
                  className="grid grid-cols-2 gap-4 sm:grid-cols-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="lecture" id="course-lecture" />
                    <Label
                      htmlFor="course-lecture"
                      className="flex items-center"
                    >
                      <BookOpen className="mr-2 h-4 w-4 text-blue-600" />
                      Kuliah
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="lab" id="course-lab" />
                    <Label htmlFor="course-lab" className="flex items-center">
                      <Microscope className="mr-2 h-4 w-4 text-violet-600" />
                      Praktikum
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="tutorial" id="course-tutorial" />
                    <Label
                      htmlFor="course-tutorial"
                      className="flex items-center"
                    >
                      <Users className="mr-2 h-4 w-4 text-emerald-600" />
                      Tutorial
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="exam" id="course-exam" />
                    <Label htmlFor="course-exam" className="flex items-center">
                      <AlertCircle className="mr-2 h-4 w-4 text-amber-600" />
                      Ujian
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="deadline" id="course-deadline" />
                    <Label
                      htmlFor="course-deadline"
                      className="flex items-center"
                    >
                      <Clock className="mr-2 h-4 w-4 text-red-600" />
                      Deadline
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="col-span-2 space-y-2">
                <Label>Warna</Label>
                <RadioGroup
                  value={params.type}
                  onValueChange={(value) =>
                    setParams({ ...params, type: value })
                  }
                  className="flex flex-wrap gap-4"
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="primary" id="color-primary" />
                          <Label
                            htmlFor="color-primary"
                            className="flex items-center"
                          >
                            <div className="bg-primary mr-2 h-5 w-5 rounded-full"></div>
                          </Label>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>Biru</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="info" id="color-info" />
                          <Label
                            htmlFor="color-info"
                            className="flex items-center"
                          >
                            <div className="mr-2 h-5 w-5 rounded-full bg-blue-500"></div>
                          </Label>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>Biru Muda</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="success" id="color-success" />
                          <Label
                            htmlFor="color-success"
                            className="flex items-center"
                          >
                            <div className="mr-2 h-5 w-5 rounded-full bg-green-500"></div>
                          </Label>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>Hijau</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="warning" id="color-warning" />
                          <Label
                            htmlFor="color-warning"
                            className="flex items-center"
                          >
                            <div className="mr-2 h-5 w-5 rounded-full bg-amber-500"></div>
                          </Label>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>Kuning</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="danger" id="color-danger" />
                          <Label
                            htmlFor="color-danger"
                            className="flex items-center"
                          >
                            <div className="mr-2 h-5 w-5 rounded-full bg-red-500"></div>
                          </Label>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>Merah</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </RadioGroup>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddCourseModalOpen(false)}
            >
              Batal
            </Button>
            <Button onClick={saveCourse}>
              {params.id ? "Perbarui Mata Kuliah" : "Tambah Mata Kuliah"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
