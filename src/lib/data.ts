// Mock data for forum discussions and assignments

// User types
export type User = {
    id: string
    name: string
    email: string
    avatar: string
    role: "student" | "lecturer" | "admin"
  }

  // Forum types
  export type Thread = {
    id: string
    title: string
    content: string
    authorId: string
    createdAt: string
    updatedAt: string
    category: string
    tags: string[]
    viewCount: number
    isLocked: boolean
    isPinned: boolean
  }

  export type Comment = {
    id: string
    threadId: string
    content: string
    authorId: string
    createdAt: string
    updatedAt: string
    parentId?: string
    isAccepted: boolean
  }

  // Assignment types
  export type Assignment = {
    id: string
    title: string
    description: string
    course: string
    courseId: string
    lecturerId: string
    createdAt: string
    dueDate: string
    isSubmitted: boolean
    submissionId?: string
    grade?: number
    weight?: number
    feedback?: string
    attachments: string[]
  }

  export type Submission = {
    id: string
    assignmentId: string
    studentId: string
    submittedAt: string
    fileName: string
    fileUrl: string
    notes?: string
    grade?: number
    feedback?: string
    status: "submitted" | "graded" | "returned"
  }

  export type Course = {
    id: string
    code: string
    name: string
    lecturer: string
    lecturerId: string
    semester: number
    credits: number
    description: string
  }

  export type Report = {
    id: string
    reporterId: string
    targetType: "thread" | "comment" | "user"
    targetId: string
    reason: string
    description: string
    createdAt: string
    updatedAt?: string
    status: "pending" | "reviewing" | "resolved" | "rejected"
    resolvedById?: string
    resolution?: string
  }

  // Mock users
  export const users: User[] = [
    {
      id: "user-1",
      name: "Dr. Andi",
      email: "andi@medscholar.ac.id",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "lecturer",
    },
    {
      id: "user-2",
      name: "Dr. Budi",
      email: "budi@medscholar.ac.id",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "lecturer",
    },
    {
      id: "user-3",
      name: "Citra",
      email: "citra@student.medscholar.ac.id",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "student",
    },
    {
      id: "user-4",
      name: "Deni",
      email: "deni@student.medscholar.ac.id",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "student",
    },
    {
      id: "user-5",
      name: "Admin User",
      email: "admin@medscholar.ac.id",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "admin",
    },
  ]

  // Mock courses
  export const courses: Course[] = [
    {
      id: "course-1",
      code: "IPD-301",
      name: "Ilmu Penyakit Dalam",
      lecturer: "Dr. Andi",
      lecturerId: "user-1",
      semester: 5,
      credits: 4,
      description: "Mata kuliah ini membahas tentang penyakit dalam pada manusia, termasuk diagnosis dan tatalaksana.",
    },
    {
      id: "course-2",
      code: "BDH-302",
      name: "Ilmu Bedah",
      lecturer: "Dr. Budi",
      lecturerId: "user-2",
      semester: 5,
      credits: 4,
      description: "Mata kuliah ini membahas tentang prinsip-prinsip bedah dan teknik operasi.",
    },
    {
      id: "course-3",
      code: "ETK-201",
      name: "Etika Kedokteran",
      lecturer: "Dr. Andi",
      lecturerId: "user-1",
      semester: 3,
      credits: 2,
      description: "Mata kuliah ini membahas tentang etika dalam praktik kedokteran dan dilema etik.",
    },
    {
      id: "course-4",
      code: "FRM-302",
      name: "Farmakologi Klinik",
      lecturer: "Dr. Budi",
      lecturerId: "user-2",
      semester: 5,
      credits: 3,
      description: "Mata kuliah ini membahas tentang penggunaan obat dalam praktik klinis.",
    },
    {
      id: "course-5",
      code: "KRD-401",
      name: "Kardiologi",
      lecturer: "Dr. Andi",
      lecturerId: "user-1",
      semester: 7,
      credits: 3,
      description: "Mata kuliah ini membahas tentang penyakit jantung dan pembuluh darah.",
    },
  ]

  // Mock threads
  export const threads: Thread[] = [
    {
      id: "thread-1",
      title: "Penanganan Kasus Hipertensi pada Pasien Geriatri",
      content:
        "Bagaimana pendekatan terbaik untuk menangani hipertensi pada pasien geriatri dengan komorbiditas diabetes?",
      authorId: "user-3",
      createdAt: "2025-04-15T08:30:00Z",
      updatedAt: "2025-04-15T08:30:00Z",
      category: "Kardiovaskular",
      tags: ["hipertensi", "geriatri", "diabetes"],
      viewCount: 245,
      isLocked: false,
      isPinned: true,
    },
    {
      id: "thread-2",
      title: "Interpretasi EKG pada Kasus Infark Miokard Akut",
      content:
        "Mohon bantuan untuk interpretasi EKG pada kasus infark miokard akut dengan elevasi ST. Apa saja tanda-tanda yang perlu diperhatikan?",
      authorId: "user-4",
      createdAt: "2025-04-20T10:15:00Z",
      updatedAt: "2025-04-20T10:15:00Z",
      category: "Kardiovaskular",
      tags: ["EKG", "infark miokard", "kardiologi"],
      viewCount: 189,
      isLocked: false,
      isPinned: false,
    },
    {
      id: "thread-3",
      title: "Manajemen Nyeri pada Pasien Kanker Stadium Lanjut",
      content:
        "Apa strategi terbaik untuk manajemen nyeri pada pasien kanker stadium lanjut yang sudah tidak responsif terhadap analgesik konvensional?",
      authorId: "user-3",
      createdAt: "2025-04-25T14:45:00Z",
      updatedAt: "2025-04-25T14:45:00Z",
      category: "Onkologi",
      tags: ["manajemen nyeri", "kanker", "paliatif"],
      viewCount: 156,
      isLocked: false,
      isPinned: false,
    },
    {
      id: "thread-4",
      title: "Diagnosis Banding Demam Berkepanjangan",
      content:
        "Pasien datang dengan keluhan demam selama 2 minggu, hasil laboratorium menunjukkan leukositosis. Apa saja diagnosis banding yang perlu dipertimbangkan?",
      authorId: "user-4",
      createdAt: "2025-06-01T09:20:00Z",
      updatedAt: "2025-06-01T09:20:00Z",
      category: "Penyakit Dalam",
      tags: ["demam", "diagnosis banding", "infeksi"],
      viewCount: 210,
      isLocked: false,
      isPinned: false,
    },
    {
      id: "thread-5",
      title: "Protokol Penanganan Stroke Iskemik Akut",
      content:
        "Mohon informasi mengenai protokol terbaru untuk penanganan stroke iskemik akut, terutama terkait waktu optimal untuk pemberian trombolisis.",
      authorId: "user-3",
      createdAt: "2025-06-04T11:30:00Z",
      updatedAt: "2025-06-04T11:30:00Z",
      category: "Neurologi",
      tags: ["stroke", "trombolisis", "neurologi"],
      viewCount: 178,
      isLocked: false,
      isPinned: false,
    },
    {
        id: "thread-6",
        title: "Tatalaksana Asma Bronkial pada Anak",
        content:
          "Apa rekomendasi terapi terbaru untuk asma bronkial pada anak usia sekolah dengan eksaserbasi berulang?",
        authorId: "user-5",
        createdAt: "2025-06-10T08:00:00Z",
        updatedAt: "2025-06-10T08:00:00Z",
        category: "Pediatri",
        tags: ["asma", "pediatri", "bronkial"],
        viewCount: 134,
        isLocked: false,
        isPinned: false,
      },
      {
        id: "thread-7",
        title: "Efektivitas Vaksin HPV pada Remaja",
        content:
          "Seberapa efektif vaksin HPV diberikan pada remaja laki-laki dan perempuan dalam mencegah kanker serviks dan penyakit terkait lainnya?",
        authorId: "user-6",
        createdAt: "2025-06-12T13:25:00Z",
        updatedAt: "2025-06-12T13:25:00Z",
        category: "Ginekologi",
        tags: ["HPV", "vaksin", "remaja"],
        viewCount: 97,
        isLocked: false,
        isPinned: false,
      },
      {
        id: "thread-8",
        title: "Pendekatan Diagnosis Lupus Eritematosus Sistemik",
        content:
          "Bagaimana pendekatan awal dalam mendiagnosis lupus eritematosus sistemik pada pasien dengan keluhan tidak spesifik?",
        authorId: "user-3",
        createdAt: "2025-06-15T10:40:00Z",
        updatedAt: "2025-06-15T10:40:00Z",
        category: "Reumatologi",
        tags: ["lupus", "autoimun", "reumatologi"],
        viewCount: 112,
        isLocked: false,
        isPinned: false,
      },
      {
        id: "thread-9",
        title: "Kebijakan Penggunaan Antibiotik di IGD",
        content:
          "Apa kebijakan terkini mengenai penggunaan antibiotik di IGD untuk mencegah resistensi antimikroba?",
        authorId: "user-7",
        createdAt: "2025-06-18T15:00:00Z",
        updatedAt: "2025-06-18T15:00:00Z",
        category: "Infeksi",
        tags: ["antibiotik", "resistensi", "IGD"],
        viewCount: 165,
        isLocked: false,
        isPinned: false,
      },
      {
        id: "thread-10",
        title: "Deteksi Dini Kanker Payudara di Fasilitas Primer",
        content:
          "Apa metode skrining yang paling sesuai untuk deteksi dini kanker payudara di layanan kesehatan primer?",
        authorId: "user-6",
        createdAt: "2025-06-20T09:10:00Z",
        updatedAt: "2025-06-20T09:10:00Z",
        category: "Onkologi",
        tags: ["kanker payudara", "skrining", "deteksi dini"],
        viewCount: 148,
        isLocked: false,
        isPinned: false,
      },
      {
        id: "thread-11",
        title: "Tatalaksana Gagal Ginjal Kronik di Puskesmas",
        content:
          "Apa saja langkah penting dalam tatalaksana awal gagal ginjal kronik di fasilitas pelayanan primer?",
        authorId: "user-5",
        createdAt: "2025-06-22T07:50:00Z",
        updatedAt: "2025-06-22T07:50:00Z",
        category: "Nefrologi",
        tags: ["gagal ginjal", "CKD", "puskesmas"],
        viewCount: 122,
        isLocked: false,
        isPinned: false,
      },
      {
        id: "thread-12",
        title: "Manajemen Kehamilan Risiko Tinggi",
        content:
          "Bagaimana pendekatan multidisiplin dalam manajemen kehamilan risiko tinggi dengan hipertensi dan preeklampsia?",
        authorId: "user-8",
        createdAt: "2025-06-25T12:00:00Z",
        updatedAt: "2025-06-25T12:00:00Z",
        category: "Obstetri",
        tags: ["kehamilan", "preeklampsia", "risiko tinggi"],
        viewCount: 138,
        isLocked: false,
        isPinned: false,
      },
      {
        id: "thread-13",
        title: "Penggunaan Telemedicine dalam Pelayanan Psikiatri",
        content:
          "Apakah telemedicine efektif dalam pemantauan pasien dengan gangguan kecemasan dan depresi?",
        authorId: "user-4",
        createdAt: "2025-06-28T16:45:00Z",
        updatedAt: "2025-06-28T16:45:00Z",
        category: "Psikiatri",
        tags: ["telemedicine", "depresi", "psikiatri"],
        viewCount: 90,
        isLocked: false,
        isPinned: false,
      },
      {
        id: "thread-14",
        title: "Pemantauan Gizi pada Pasien ICU",
        content:
          "Apa saja parameter utama yang digunakan untuk pemantauan status gizi pasien di ICU?",
        authorId: "user-7",
        createdAt: "2025-07-01T08:20:00Z",
        updatedAt: "2025-07-01T08:20:00Z",
        category: "Gizi Klinik",
        tags: ["gizi", "ICU", "nutrisi"],
        viewCount: 104,
        isLocked: false,
        isPinned: false,
      },
      {
        id: "thread-15",
        title: "Penanganan Luka Bakar Derajat Sedang",
        content:
          "Apa protokol standar dalam penanganan luka bakar derajat sedang di fasilitas layanan sekunder?",
        authorId: "user-6",
        createdAt: "2025-07-03T14:30:00Z",
        updatedAt: "2025-07-03T14:30:00Z",
        category: "Bedah",
        tags: ["luka bakar", "penanganan", "bedah"],
        viewCount: 117,
        isLocked: false,
        isPinned: false,
      },
  ]

  // Mock comments
  export const comments: Comment[] = [
    {
      id: "comment-1",
      threadId: "thread-1",
      content:
        "Pada pasien geriatri dengan hipertensi dan diabetes, pendekatan yang direkomendasikan adalah memulai dengan dosis rendah dan titrasi perlahan. ACE inhibitor atau ARB biasanya menjadi pilihan pertama karena efek protektif pada ginjal.",
      authorId: "user-2",
      createdAt: "2025-04-15T09:45:00Z",
      updatedAt: "2025-04-15T09:45:00Z",
      isAccepted: true,
    },
    {
      id: "comment-2",
      threadId: "thread-1",
      content:
        "Selain itu, perlu diperhatikan juga interaksi obat karena pasien geriatri sering mengonsumsi multiple medications. Monitoring fungsi ginjal secara berkala juga sangat penting.",
      authorId: "user-1",
      createdAt: "2025-04-15T10:30:00Z",
      updatedAt: "2023-04-15T10:30:00Z",
      isAccepted: false,
    },
    {
      id: "comment-3",
      threadId: "thread-1",
      parentId: "comment-1",
      content:
        "Apakah ada target tekanan darah spesifik untuk pasien geriatri dengan diabetes? Beberapa literatur menyebutkan target yang berbeda-beda.",
      authorId: "user-3",
      createdAt: "2023-04-15T11:15:00Z",
      updatedAt: "2023-04-15T11:15:00Z",
      isAccepted: false,
    },
    {
      id: "comment-4",
      threadId: "thread-2",
      content:
        "Pada kasus infark miokard akut dengan elevasi ST, perhatikan adanya elevasi ST yang konveks pada lead yang berdekatan, yang menunjukkan area infark. Perhatikan juga adanya gelombang Q patologis dan inversi gelombang T.",
      authorId: "user-1",
      createdAt: "2023-04-20T11:00:00Z",
      updatedAt: "2023-04-20T11:00:00Z",
      isAccepted: true,
    },
    {
      id: "comment-5",
      threadId: "thread-3",
      content:
        "Untuk manajemen nyeri pada pasien kanker stadium lanjut, pendekatan multimodal sangat direkomendasikan. Kombinasi opioid dengan adjuvan seperti antikonvulsan atau antidepresan dapat meningkatkan efektivitas. Intervensi non-farmakologis juga penting untuk dipertimbangkan.",
      authorId: "user-2",
      createdAt: "2023-04-25T15:30:00Z",
      updatedAt: "2023-04-25T15:30:00Z",
      isAccepted: true,
    },
  ]

  // Mock assignments
  export const assignments: Assignment[] = [
    {
      id: "assignment-1",
      title: "Laporan Kasus Hipertensi",
      description:
        "Buatlah laporan kasus pasien hipertensi yang Anda temui selama rotasi di departemen Penyakit Dalam. Laporan harus mencakup anamnesis, pemeriksaan fisik, pemeriksaan penunjang, diagnosis, dan rencana tatalaksana.",
      course: "Ilmu Penyakit Dalam",
      courseId: "course-1",
      lecturerId: "user-1",
      createdAt: "2023-04-10T08:00:00Z",
      dueDate: "2023-04-25T23:59:59Z",
      isSubmitted: true,
      submissionId: "submission-1",
      grade: 85,
      weight: 25,
      feedback:
        "Laporan kasus sangat komprehensif dan analisis diagnostik sangat baik. Pertimbangkan untuk menambahkan lebih banyak literatur terkini untuk mendukung rencana tatalaksana yang Anda usulkan.",
      attachments: ["Panduan_Laporan_Kasus.pdf", "Template_Laporan.docx"],
    },
    {
      id: "assignment-2",
      title: "Presentasi Kasus Bedah Digestif",
      description:
        "Siapkan presentasi kasus bedah digestif untuk diskusi kelompok. Pilih satu kasus menarik yang Anda temui selama rotasi di departemen Bedah. Presentasi harus mencakup gambaran klinis, pendekatan diagnostik, teknik operasi, dan follow-up pasca operasi.",
      course: "Ilmu Bedah",
      courseId: "course-2",
      lecturerId: "user-2",
      createdAt: "2023-04-15T10:00:00Z",
      dueDate: "2023-06-01T23:59:59Z",
      isSubmitted: true,
      submissionId: "submission-2",
      grade: 78,
      weight: 25,
      feedback:
        "Presentasi kasus cukup baik, namun perlu penjelasan lebih detail mengenai teknik operasi yang dipilih. Diskusi mengenai alternatif tindakan dan evidence-based medicine perlu diperdalam.",
      attachments: ["Panduan_Presentasi_Kasus.pdf"],
    },
    {
      id: "assignment-3",
      title: "Refleksi Etika Kedokteran",
      description:
        "Tuliskan refleksi pribadi mengenai dilema etika yang Anda hadapi selama praktik klinik. Bahas prinsip-prinsip etika yang terlibat, alternatif tindakan, dan justifikasi keputusan yang diambil.",
      course: "Etika Kedokteran",
      courseId: "course-3",
      lecturerId: "user-1",
      createdAt: "2023-04-20T09:00:00Z",
      dueDate: "2023-06-10T23:59:59Z",
      isSubmitted: false,
      attachments: ["Panduan_Refleksi_Etika.pdf"],
    },
    {
      id: "assignment-4",
      title: "Laporan Praktikum Farmakologi",
      description:
        "Buatlah laporan praktikum farmakologi tentang uji efek obat pada hewan coba. Laporan harus mencakup metodologi, hasil pengamatan, analisis data, dan diskusi.",
      course: "Farmakologi Klinik",
      courseId: "course-4",
      lecturerId: "user-2",
      createdAt: "2023-04-25T11:00:00Z",
      dueDate: "2023-06-15T23:59:59Z",
      isSubmitted: false,
      attachments: ["Panduan_Praktikum_Farmakologi.pdf", "Template_Laporan_Praktikum.docx"],
    },
    {
      id: "assignment-5",
      title: "Jurnal Baca Kardiologi",
      description:
        "Pilih satu artikel penelitian terbaru (maksimal 2 tahun terakhir) dari jurnal kardiologi bereputasi. Buatlah ringkasan dan analisis kritis terhadap metodologi, hasil, dan implikasi klinis dari penelitian tersebut.",
      course: "Kardiologi",
      courseId: "course-5",
      lecturerId: "user-1",
      createdAt: "2023-06-01T08:30:00Z",
      dueDate: "2023-06-20T23:59:59Z",
      isSubmitted: false,
      attachments: ["Panduan_Jurnal_Baca.pdf"],
    },
    {
      id: "assignment-6",
      title: "Laporan Kasus Bedah",
      description:
        "Buatlah laporan kasus bedah yang Anda temui selama rotasi di departemen Bedah. Laporan harus mencakup anamnesis, pemeriksaan fisik, pemeriksaan penunjang, diagnosis, dan rencana tatalaksana bedah.",
      course: "Ilmu Bedah",
      courseId: "course-2",
      lecturerId: "user-2",
      createdAt: "2023-06-04T10:00:00Z",
      dueDate: "2023-06-25T23:59:59Z",
      isSubmitted: false,
      attachments: ["Panduan_Laporan_Kasus_Bedah.pdf", "Template_Laporan_Bedah.docx"],
    },
  ]

  // Mock submissions
  export const submissions: Submission[] = [
    {
      id: "submission-1",
      assignmentId: "assignment-1",
      studentId: "user-3",
      submittedAt: "2023-04-24T15:30:00Z",
      fileName: "Laporan_Kasus_Hipertensi_Citra.pdf",
      fileUrl: "/files/Laporan_Kasus_Hipertensi_Citra.pdf",
      notes: "Saya melampirkan laporan kasus pasien hipertensi dengan komplikasi gagal ginjal kronik. Terima kasih.",
      grade: 85,
      feedback:
        "Laporan kasus sangat komprehensif dan analisis diagnostik sangat baik. Pertimbangkan untuk menambahkan lebih banyak literatur terkini untuk mendukung rencana tatalaksana yang Anda usulkan.",
      status: "graded",
    },
    {
      id: "submission-2",
      assignmentId: "assignment-2",
      studentId: "user-3",
      submittedAt: "2023-04-30T14:45:00Z",
      fileName: "Presentasi_Kasus_Bedah_Digestif_Citra.pptx",
      fileUrl: "/files/Presentasi_Kasus_Bedah_Digestif_Citra.pptx",
      notes: "Presentasi kasus kolesistitis akut dengan pendekatan laparoskopi.",
      grade: 78,
      feedback:
        "Presentasi kasus cukup baik, namun perlu penjelasan lebih detail mengenai teknik operasi yang dipilih. Diskusi mengenai alternatif tindakan dan evidence-based medicine perlu diperdalam.",
      status: "graded",
    },
    {
      id: "submission-3",
      assignmentId: "assignment-1",
      studentId: "user-4",
      submittedAt: "2023-04-23T16:20:00Z",
      fileName: "Laporan_Kasus_Hipertensi_Deni.pdf",
      fileUrl: "/files/Laporan_Kasus_Hipertensi_Deni.pdf",
      notes: "Laporan kasus pasien hipertensi dengan riwayat stroke.",
      grade: 82,
      feedback:
        "Laporan kasus baik dan terstruktur. Pembahasan patofisiologi hipertensi sebagai faktor risiko stroke sangat informatif. Perlu ditambahkan strategi pencegahan sekunder yang lebih detail.",
      status: "graded",
    },
  ]

  export const reports: Report[] = [
    {
      id: "report-1",
      reporterId: "user-3",
      targetType: "thread",
      targetId: "thread-1",
      reason: "misinformation",
      description: "Informasi yang tidak akurat tentang penanganan hipertensi.",
      createdAt: "2023-11-20T10:00:00Z",
      status: "pending",
    },
    {
      id: "report-2",
      reporterId: "user-4",
      targetType: "comment",
      targetId: "comment-2",
      reason: "inappropriate",
      description: "Komentar yang tidak pantas.",
      createdAt: "2023-11-21T14:30:00Z",
      status: "reviewing",
    },
    {
      id: "report-3",
      reporterId: "user-3",
      targetType: "user",
      targetId: "user-5",
      reason: "harassment",
      description: "Pelecehan terhadap pengguna lain.",
      createdAt: "2023-11-22T09:15:00Z",
      status: "resolved",
      resolvedById: "user-1",
      resolution: "Pengguna telah diberi peringatan.",
    },
    {
      id: "report-4",
      reporterId: "user-4",
      targetType: "comment",
      targetId: "comment-5",
      reason: "spam",
      description: "Komentar spam.",
      createdAt: "2023-11-23T16:45:00Z",
      status: "rejected",
      resolvedById: "user-2",
      resolution: "Laporan tidak valid.",
    },
  ]

  // Helper functions to get data
  export function getUserById(id: string): User | undefined {
    return users.find((user) => user.id === id)
  }

  export function getThreadById(id: string): Thread | undefined {
    return threads.find((thread) => thread.id === id)
  }

  export function getCommentsByThreadId(threadId: string): Comment[] {
    return comments.filter((comment) => comment.threadId === threadId)
  }

  export function getAssignmentById(id: string): Assignment | undefined {
    return assignments.find((assignment) => assignment.id === id)
  }

  export function getAssignmentsByStudentId(studentId: string): Assignment[] {
    // In a real app, this would filter assignments based on student's courses
    // For mock data, we'll just return all assignments
    return assignments.map((assignment) => {
      // Check if student has submitted this assignment
      const submission = submissions.find((sub) => sub.assignmentId === assignment.id && sub.studentId === studentId)

      if (submission) {
        return {
          ...assignment,
          isSubmitted: true,
          submissionId: submission.id,
          grade: submission.grade,
          feedback: submission.feedback,
        }
      }

      return assignment
    })
  }

  export function getSubmissionsByAssignmentId(assignmentId: string): Submission[] {
    return submissions.filter((submission) => submission.assignmentId === assignmentId)
  }

  export function getSubmissionById(id: string): Submission | undefined {
    return submissions.find((submission) => submission.id === id)
  }

  export function getSubmissionsByStudentId(studentId: string): Submission[] {
    return submissions.filter((submission) => submission.studentId === studentId)
  }

  export function getCourses(): Course[] {
    return courses
  }

  export function getCourseById(id: string): Course | undefined {
    return courses.find((course) => course.id === id)
  }

  export function getUpcomingAssignments(studentId: string): Assignment[] {
    const studentAssignments = getAssignmentsByStudentId(studentId)
    return studentAssignments
      .filter((a) => !a.isSubmitted && new Date(a.dueDate) >= new Date())
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
  }

  // Tambahkan fungsi helper untuk mendapatkan kategori dan tag unik
  export function getUniqueCategories(): string[] {
    const categories = threads.map((thread) => thread.category)
    return Array.from(new Set(categories)).sort()
  }

  export function getUniqueTags(): string[] {
    const allTags = threads.flatMap((thread) => thread.tags)
    return Array.from(new Set(allTags)).sort()
  }
