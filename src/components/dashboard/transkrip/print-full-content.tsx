import type React from "react";

interface MataKuliah {
  kode: string;
  nama: string;
  sks: number;
  nilai: string;
  bobot: number;
}

interface SemesterData {
  semester: string;
  ip: number;
  sks: number;
  mataKuliah: MataKuliah[];
}

interface TranskripInfo {
  nama: string;
  nim: string;
  program: string;
  fakultas: string;
  angkatan: string;
  ipk: number;
  totalSks: number;
  targetSks: number;
  semester: number;
}

interface TranskripFullPrintContentProps {
  transkripInfo: TranskripInfo;
  nilaiPerSemester: SemesterData[];
}

export const TranskripFullPrintContent: React.FC<
  TranskripFullPrintContentProps
> = ({ transkripInfo, nilaiPerSemester }) => {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Calculate total credits and courses
  const totalCourses = nilaiPerSemester.reduce(
    (acc, semester) => acc + semester.mataKuliah.length,
    0
  );

  // Calculate total grade points (SKS * Bobot)
  const totalGradePoints = nilaiPerSemester.reduce((acc, semester) => {
    return (
      acc +
      semester.mataKuliah.reduce((semAcc, course) => {
        return semAcc + course.sks * course.bobot;
      }, 0)
    );
  }, 0);

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
              {transkripInfo.fakultas}
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
            TRN/{currentDate.getFullYear()}/{transkripInfo.nim}
          </div>
        </div>
      </div>

      {/* Document Title */}
      <div className="document-title mb-6 text-center">
        <h1 className="border-2 border-gray-800 bg-gray-50 py-2 text-xl font-bold tracking-wider uppercase">
          TRANSKRIP NILAI AKADEMIK
        </h1>
      </div>

      {/* Student Information */}
      <div className="student-info mb-6 rounded-md border border-gray-300 bg-gray-50 p-4">
        <div className="grid grid-cols-2 gap-x-8 gap-y-2">
          <div className="student-info-item">
            <div className="student-info-label text-xs font-medium text-gray-500">
              Nama Mahasiswa
            </div>
            <div className="student-info-value text-sm font-semibold">
              {transkripInfo.nama}
            </div>
          </div>
          <div className="student-info-item">
            <div className="student-info-label text-xs font-medium text-gray-500">
              Nomor Induk Mahasiswa
            </div>
            <div className="student-info-value text-sm font-semibold">
              {transkripInfo.nim}
            </div>
          </div>
          <div className="student-info-item">
            <div className="student-info-label text-xs font-medium text-gray-500">
              Program Studi
            </div>
            <div className="student-info-value text-sm font-semibold">
              {transkripInfo.program}
            </div>
          </div>
          <div className="student-info-item">
            <div className="student-info-label text-xs font-medium text-gray-500">
              Fakultas
            </div>
            <div className="student-info-value text-sm font-semibold">
              {transkripInfo.fakultas}
            </div>
          </div>
          <div className="student-info-item">
            <div className="student-info-label text-xs font-medium text-gray-500">
              Angkatan
            </div>
            <div className="student-info-value text-sm font-semibold">
              {transkripInfo.angkatan}
            </div>
          </div>
          <div className="student-info-item">
            <div className="student-info-label text-xs font-medium text-gray-500">
              Status
            </div>
            <div className="student-info-value text-sm font-semibold">
              Aktif
            </div>
          </div>
        </div>
      </div>

      {/* Academic Summary */}
      <div className="academic-summary mb-6 flex justify-between rounded-md border border-gray-300 bg-gray-50 p-4">
        <div className="flex flex-col items-center gap-1 border-r border-gray-300 px-4">
          <div className="text-xs font-medium text-gray-500">Total SKS</div>
          <div className="text-lg font-bold">{transkripInfo.totalSks}</div>
          <div className="text-xs text-gray-500">
            dari {transkripInfo.targetSks} SKS
          </div>
        </div>
        <div className="flex flex-col items-center gap-1 border-r border-gray-300 px-4">
          <div className="text-xs font-medium text-gray-500">
            Total Mata Kuliah
          </div>
          <div className="text-lg font-bold">{totalCourses}</div>
          <div className="text-xs text-gray-500">yang telah ditempuh</div>
        </div>
        <div className="flex flex-col items-center gap-1 border-r border-gray-300 px-4">
          <div className="text-xs font-medium text-gray-500">IPK</div>
          <div className="text-lg font-bold">
            {transkripInfo.ipk.toFixed(2)}
          </div>
          <div className="text-xs text-gray-500">dari skala 4.00</div>
        </div>
        <div className="flex flex-col items-center gap-1 px-4">
          <div className="text-xs font-medium text-gray-500">Semester</div>
          <div className="text-lg font-bold">{transkripInfo.semester}</div>
          <div className="text-xs text-gray-500">saat ini</div>
        </div>
      </div>

      {/* Transcript Table */}
      <div className="transcript-table mb-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-400 bg-gray-200 p-2 text-left">
                Kode
              </th>
              <th className="border border-gray-400 bg-gray-200 p-2 text-left">
                Mata Kuliah
              </th>
              <th className="border border-gray-400 bg-gray-200 p-2 text-center">
                SKS
              </th>
              <th className="border border-gray-400 bg-gray-200 p-2 text-center">
                Nilai
              </th>
              <th className="border border-gray-400 bg-gray-200 p-2 text-center">
                Bobot
              </th>
              <th className="border border-gray-400 bg-gray-200 p-2 text-left">
                Semester
              </th>
            </tr>
          </thead>
          <tbody>
            {nilaiPerSemester.flatMap((semester, semesterIndex) =>
              semester.mataKuliah.map((mk, index) => (
                <tr
                  key={`${mk.kode}-${semester.semester}`}
                  className={
                    (semesterIndex * semester.mataKuliah.length + index) % 2 ===
                    0
                      ? "bg-white"
                      : "bg-gray-50"
                  }
                >
                  <td className="border border-gray-300 p-2 font-medium">
                    {mk.kode}
                  </td>
                  <td className="border border-gray-300 p-2">{mk.nama}</td>
                  <td className="border border-gray-300 p-2 text-center">
                    {mk.sks}
                  </td>
                  <td className="border border-gray-300 p-2 text-center font-medium">
                    {mk.nilai}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    {mk.bobot.toFixed(1)}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {semester.semester}
                  </td>
                </tr>
              ))
            )}
          </tbody>
          <tfoot>
            <tr className="bg-gray-200">
              <td
                colSpan={2}
                className="border border-gray-400 p-2 text-right font-bold"
              >
                TOTAL KESELURUHAN:
              </td>
              <td className="border border-gray-400 p-2 text-center font-bold">
                {transkripInfo.totalSks}
              </td>
              <td
                colSpan={2}
                className="border border-gray-400 p-2 text-center font-bold"
              >
                IPK: {transkripInfo.ipk.toFixed(2)}
              </td>
              <td className="border border-gray-400 p-2"></td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Grade Scale Reference */}
      <div className="grade-scale mb-6 rounded-md border border-gray-300 bg-gray-50 p-3">
        <h3 className="mb-2 text-sm font-semibold">Skala Penilaian:</h3>
        <div className="grid grid-cols-5 gap-2 text-xs">
          <div>A = 4.0 (≥ 85)</div>
          <div>A- = 3.7 (80-84)</div>
          <div>B+ = 3.5 (75-79)</div>
          <div>B = 3.0 (70-74)</div>
          <div>B- = 2.7 (65-69)</div>
          <div>C+ = 2.3 (60-64)</div>
          <div>C = 2.0 (55-59)</div>
          <div>D = 1.0 (40-54)</div>
          <div>E = 0.0 (&lt; 40)</div>
        </div>
      </div>

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
          <p className="mt-1">Dekan {transkripInfo.fakultas}</p>

          <div className="mt-4 flex justify-end">
            <div className="stamp h-20 w-20 rounded-full border border-dashed border-gray-400 bg-gray-50 p-1">
              <div className="flex h-full w-full items-center justify-center rounded-full border border-gray-300 text-xs text-gray-500">
                Stempel
              </div>
            </div>
          </div>

          <div className="signature-name mt-4">
            <div className="mb-1 h-px w-48 bg-black"></div>
            <p className="font-semibold">Prof. Dr. Bambang Sutejo, M.Kom.</p>
            <p>NIP. 196505121990031002</p>
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
