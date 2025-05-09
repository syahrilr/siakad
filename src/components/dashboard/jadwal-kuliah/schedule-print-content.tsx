import type React from "react";

interface Course {
  id: string;
  title: string;
  day: string;
  startHour: number;
  endHour: number;
  location: string;
  lecturer: string;
  lecturerInitials: string;
  type: string;
  credits: number;
}

interface StudentInfo {
  name: string;
  nim: string;
  program: string;
  faculty: string;
  semester: string;
  academicYear: string;
}

interface JadwalPrintContentProps {
  studentInfo: StudentInfo;
  courses: Course[];
  printFormat: string;
}

export const JadwalPrintContent: React.FC<JadwalPrintContentProps> = ({
  studentInfo,
  courses,
  printFormat,
}) => {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Group courses by day for the weekly view
  const coursesByDay = courses.reduce(
    (acc, course) => {
      if (!acc[course.day]) {
        acc[course.day] = [];
      }
      acc[course.day].push(course);
      return acc;
    },
    {} as Record<string, Course[]>
  );

  // Sort days in the correct order
  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const sortedDays = Object.keys(coursesByDay).sort(
    (a, b) => days.indexOf(a) - days.indexOf(b)
  );

  // Calculate total credits and hours
  const totalCredits = courses.reduce((acc, course) => acc + course.credits, 0);
  const totalHours = courses.reduce(
    (acc, course) => acc + (course.endHour - course.startHour),
    0
  );

  // Format hour (e.g., 9.5 -> "09:30")
  const formatHour = (hour: number) => {
    const hourInt = Math.floor(hour);
    const minutes = Math.round((hour - hourInt) * 60);
    return `${hourInt.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  };

  // Get course type label
  const getTypeLabel = (type: string) => {
    switch (type) {
      case "lecture":
        return "Kuliah";
      case "lab":
        return "Praktikum";
      case "tutorial":
        return "Tutorial";
      default:
        return "Lainnya";
    }
  };

  // Get course type class
  const getTypeClass = (type: string) => {
    switch (type) {
      case "lecture":
        return "course-type-lecture";
      case "lab":
        return "course-type-lab";
      case "tutorial":
        return "course-type-tutorial";
      default:
        return "";
    }
  };

  // Generate time slots for weekly schedule
  const timeSlots = Array.from({ length: 12 }, (_, i) => i + 7); // 7:00 - 18:00

  return (
    <div className="print-content p-8">
      {/* University Header with Logo */}
      <div className="print-header mb-6 flex items-center justify-between border-b-2 border-black pb-4">
        <div className="flex items-center gap-4">
          <div className="university-logo flex h-20 w-20 items-center justify-center rounded-full border-2 border-gray-800 bg-gray-50 text-center">
            <div className="text-2xl font-bold">UK</div>
          </div>
          <div>
            <h1 className="university-name text-xl font-bold tracking-wide uppercase">
              UNIVERSITAS KESEHATAN
            </h1>
            <h2 className="faculty-name text-lg font-semibold">
              {studentInfo.faculty}
            </h2>
            <p className="text-sm">
              Jl. Pendidikan No. 123, Jakarta Pusat 10110
            </p>
            <p className="text-sm">
              Telp: (021) 555-1234 | Email: akademik@ukes.ac.id
            </p>
          </div>
        </div>
        <div className="document-number border border-gray-800 p-2 text-center">
          <div className="text-xs font-medium">No. Dokumen</div>
          <div className="text-sm font-bold">
            JDW/{currentDate.getFullYear()}/{studentInfo.nim}
          </div>
        </div>
      </div>

      {/* Document Title */}
      <div className="document-title mb-6 text-center">
        <h1 className="border-2 border-gray-800 bg-gray-50 py-2 text-xl font-bold tracking-wider uppercase">
          JADWAL KULIAH
        </h1>
        <h2 className="mt-2 text-lg font-semibold">
          {studentInfo.semester} - Tahun Akademik {studentInfo.academicYear}
        </h2>
      </div>

      {/* Student Information */}
      <div className="student-info mb-6 rounded-md border border-gray-300 bg-gray-50 p-4">
        <div className="grid grid-cols-2 gap-x-8 gap-y-2">
          <div className="student-info-item">
            <div className="student-info-label text-xs font-medium text-gray-500">
              Nama Mahasiswa
            </div>
            <div className="student-info-value text-sm font-semibold">
              {studentInfo.name}
            </div>
          </div>
          <div className="student-info-item">
            <div className="student-info-label text-xs font-medium text-gray-500">
              Nomor Induk Mahasiswa
            </div>
            <div className="student-info-value text-sm font-semibold">
              {studentInfo.nim}
            </div>
          </div>
          <div className="student-info-item">
            <div className="student-info-label text-xs font-medium text-gray-500">
              Program Studi
            </div>
            <div className="student-info-value text-sm font-semibold">
              {studentInfo.program}
            </div>
          </div>
          <div className="student-info-item">
            <div className="student-info-label text-xs font-medium text-gray-500">
              Fakultas
            </div>
            <div className="student-info-value text-sm font-semibold">
              {studentInfo.faculty}
            </div>
          </div>
        </div>
      </div>

      {printFormat === "weekly" && (
        <>
          {/* Weekly Schedule */}
          <h3 className="mb-2 text-base font-semibold">Jadwal Mingguan</h3>
          <div className="weekly-schedule mb-6">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="time-slot">Jam</th>
                  {days.slice(0, 5).map((day) => (
                    <th key={day} className="day-column">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((hour) => (
                  <tr key={hour}>
                    <td className="time-slot border">
                      {formatHour(hour)} - {formatHour(hour + 1)}
                    </td>
                    {days.slice(0, 5).map((day) => {
                      const coursesInSlot = (coursesByDay[day] || []).filter(
                        (course) =>
                          course.startHour <= hour + 0.5 &&
                          course.endHour > hour
                      );
                      return (
                        <td key={`${day}-${hour}`} className="border">
                          {coursesInSlot.map((course) => (
                            <div
                              key={course.id}
                              className={`course-cell ${
                                course.type === "lecture"
                                  ? "course-cell-lecture"
                                  : course.type === "lab"
                                    ? "course-cell-lab"
                                    : ""
                              }`}
                            >
                              <div className="font-bold">{course.title}</div>
                              <div>{course.location}</div>
                            </div>
                          ))}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Legend */}
          <div className="legend mb-6 flex">
            <div className="legend-item">
              <div className="legend-color course-cell-lecture"></div>
              <span>Kuliah</span>
            </div>
            <div className="legend-item">
              <div className="legend-color course-cell-lab"></div>
              <span>Praktikum</span>
            </div>
            <div className="legend-item">
              <div className="legend-color border border-gray-300 bg-white"></div>
              <span>Kosong</span>
            </div>
          </div>
        </>
      )}

      {/* Course List */}
      <h3 className="mb-2 text-base font-semibold">Daftar Mata Kuliah</h3>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2 text-left">No</th>
            <th className="border p-2 text-left">Kode</th>
            <th className="border p-2 text-left">Mata Kuliah</th>
            <th className="border p-2 text-center">SKS</th>
            <th className="border p-2 text-left">Jadwal</th>
            <th className="border p-2 text-left">Ruang</th>
            <th className="border p-2 text-left">Dosen</th>
            <th className="border p-2 text-center">Jenis</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr
              key={course.id}
              className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              <td className="border p-2 text-center">{index + 1}</td>
              <td className="border p-2 font-medium">{course.id}</td>
              <td className="border p-2">{course.title}</td>
              <td className="border p-2 text-center">{course.credits}</td>
              <td className="border p-2">
                {course.day}, {formatHour(course.startHour)} -{" "}
                {formatHour(course.endHour)}
              </td>
              <td className="border p-2">{course.location}</td>
              <td className="border p-2">{course.lecturer}</td>
              <td className="border p-2 text-center">
                <span className={`course-type ${getTypeClass(course.type)}`}>
                  {getTypeLabel(course.type)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-gray-200">
            <td colSpan={3} className="border p-2 text-right font-bold">
              TOTAL:
            </td>
            <td className="border p-2 text-center font-bold">{totalCredits}</td>
            <td colSpan={4} className="border p-2"></td>
          </tr>
        </tfoot>
      </table>

      {/* Verification and Signature */}
      <div className="verification-signature mt-8 flex justify-between">
        <div className="verification flex flex-col items-center">
          <div className="qr-code mb-2 h-24 w-24 border border-gray-400 bg-gray-100 p-1">
            <div className="flex h-full w-full items-center justify-center border border-dashed border-gray-400 text-xs text-gray-500">
              QR Code
            </div>
          </div>
          <div className="text-xs text-gray-500">Scan untuk verifikasi</div>
        </div>

        <div className="signature text-right">
          <p>Jakarta, {formattedDate}</p>
          <p className="mt-1">Ketua Program Studi {studentInfo.program}</p>

          <div className="mt-4 flex justify-end">
            <div className="stamp h-20 w-20 rounded-full border border-dashed border-gray-400 bg-gray-50 p-1">
              <div className="flex h-full w-full items-center justify-center rounded-full border border-gray-300 text-xs text-gray-500">
                Stempel
              </div>
            </div>
          </div>

          <div className="signature-name mt-4">
            <div className="mb-1 h-px w-48 bg-black"></div>
            <p className="font-semibold">Dr. Hendra Wijaya, M.Kes.</p>
            <p>NIP. 197505121998031004</p>
          </div>
        </div>
      </div>

      {/* Print Timestamp */}
      <div className="print-timestamp mt-4 text-right text-xs text-gray-500">
        Dicetak pada: {currentDate.toLocaleString("id-ID")}
      </div>
    </div>
  );
};
