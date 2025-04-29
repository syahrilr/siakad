"use client";

import { useParams } from "next/navigation";

import CourseLessonPage from "@/components/dashboard/e-learning/course-page";

export default function CoursePage() {
  const params = useParams();
  const courseCode = params.courseCode as string;

  return <CourseLessonPage courseCode={courseCode} />;
}
