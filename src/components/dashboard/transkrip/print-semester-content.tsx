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

interface TranskripSemesterPrintContentProps {
  transkripInfo: TranskripInfo;
  nilaiPerSemester: SemesterData[];
  selectedSemester: string | null;
}

export const TranskripSemesterPrintContent: React.FC<
  TranskripSemesterPrintContentProps
> = ({ transkripInfo, nilaiPerSemester, selectedSemester }) => {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const semesterData = nilaiPerSemester.find(
    (s) => s.semester === selectedSemester
  );

  if (!selectedSemester || !semesterData) {
    return <div>Tidak ada data semester yang dipilih</div>;
  }

  return (
    <div className="print-content p-8">
      <div className="print-header mb-8 text-center">
        <h1 className="university-name text-2xl font-bold">
          TRANSKRIP NILAI SEMESTER
        </h1>
        <h2 className="faculty-name mt-2 text-xl font-semibold">
          {transkripInfo.fakultas}
        </h2>
        <h3 className="mt-1 text-lg font-medium">{selectedSemester}</h3>
        <div className="student-info mt-4 border-t border-b border-gray-300 py-4">
          <div className="student-info-grid grid grid-cols-2 gap-4 text-sm">
            <div>
              <p>
                <span className="student-info-label font-semibold">Nama:</span>{" "}
                {transkripInfo.nama}
              </p>
              <p>
                <span className="student-info-label font-semibold">NIM:</span>{" "}
                {transkripInfo.nim}
              </p>
              <p>
                <span className="student-info-label font-semibold">
                  Program Studi:
                </span>{" "}
                {transkripInfo.program}
              </p>
            </div>
            <div>
              <p>
                <span className="student-info-label font-semibold">
                  Angkatan:
                </span>{" "}
                {transkripInfo.angkatan}
              </p>
              <p>
                <span className="student-info-label font-semibold">
                  IP Semester:
                </span>{" "}
                {semesterData.ip.toFixed(2)}
              </p>
              <p>
                <span className="student-info-label font-semibold">
                  Total SKS:
                </span>{" "}
                {semesterData.sks}
              </p>
            </div>
          </div>
        </div>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2 text-left">Kode</th>
            <th className="border border-gray-300 p-2 text-left">
              Mata Kuliah
            </th>
            <th className="border border-gray-300 p-2 text-center">SKS</th>
            <th className="border border-gray-300 p-2 text-center">Nilai</th>
            <th className="border border-gray-300 p-2 text-center">Bobot</th>
          </tr>
        </thead>
        <tbody>
          {semesterData.mataKuliah.map((mk, index) => (
            <tr
              key={mk.kode}
              className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
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
            </tr>
          ))}
        </tbody>
      </table>

      <div className="summary mt-8 flex justify-between text-sm">
        <div>
          <p>
            <span className="font-semibold">Total SKS:</span> {semesterData.sks}
          </p>
          <p>
            <span className="font-semibold">Total Mata Kuliah:</span>{" "}
            {semesterData.mataKuliah.length}
          </p>
        </div>
        <div>
          <p>
            <span className="font-semibold">IP Semester:</span>{" "}
            {semesterData.ip.toFixed(2)}
          </p>
          <p>
            <span className="font-semibold">Status:</span> Selesai
          </p>
        </div>
      </div>

      <div className="signature mt-12 text-right">
        <p>Jakarta, {formattedDate}</p>
        <p className="mt-1">Dekan {transkripInfo.fakultas}</p>
        <div className="signature-name mt-16">
          <p className="font-semibold">Prof. Dr. Bambang Sutejo, M.Kom.</p>
          <p>NIP. 196505121990031002</p>
        </div>
      </div>

      <div className="print-timestamp mt-8 text-right text-xs text-gray-500">
        Dicetak pada: {currentDate.toLocaleString("id-ID")}
      </div>
    </div>
  );
};
