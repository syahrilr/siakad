// Define types for course data structure
export interface Resource {
    title: string
    type: string
    size: string
  }

  export interface Lesson {
    id: string
    title: string
    duration: string
    isCompleted: boolean
    type: "video" | "quiz" | "assignment" | "lab"
    isCurrent?: boolean
  }

  export interface Section {
    id: number
    title: string
    isCompleted: boolean
    lessons: Lesson[]
  }

  export interface CurrentLesson {
    title: string
    description: string
    resources: Resource[]
  }

  export interface Course {
    title: string
    instructor: string
    progress: number
    rating: number
    totalStudents: number
    lastUpdated: string
    sections: Section[]
    currentLesson: CurrentLesson
  }

  export interface CourseData {
    [key: string]: Course
  }
