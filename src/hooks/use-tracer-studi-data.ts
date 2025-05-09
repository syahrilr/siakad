export function useTracerStudyData() {
    // Dummy data for tracer study
    const tracerStudyInfo = {
      status: "Belum Diisi",
      deadline: "30 Juni 2024",
      jumlahPertanyaan: 25,
      estimasiWaktu: "15 menit",
    }

    const statistikAlumni = {
      totalAlumni: 1250,
      bekerja: 950,
      wirausaha: 150,
      melanjutkanStudi: 100,
      mencariKerja: 50,
      bidangPekerjaan: [
        { bidang: "Teknologi Informasi", persentase: 45 },
        { bidang: "Perbankan & Keuangan", persentase: 20 },
        { bidang: "Konsultan", persentase: 15 },
        { bidang: "Pendidikan", persentase: 10 },
        { bidang: "Lainnya", persentase: 10 },
      ],
      waktuTunggu: [
        { waktu: "< 3 bulan", persentase: 60 },
        { waktu: "3-6 bulan", persentase: 25 },
        { waktu: "6-12 bulan", persentase: 10 },
        { waktu: "> 12 bulan", persentase: 5 },
      ],
    }

    const testimoniAlumni = [
      {
        nama: "Ahmad Rizky",
        angkatan: "2018",
        pekerjaan: "Software Engineer",
        perusahaan: "Google Indonesia",
        testimoni:
          "Ilmu yang saya dapatkan selama kuliah sangat membantu dalam karir saya sebagai Software Engineer. Dosen-dosen yang kompeten dan kurikulum yang up-to-date membuat saya siap menghadapi dunia kerja.",
        foto: "https://images.pexels.com/photos/14940646/pexels-photo-14940646.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        nama: "Siti Nurhaliza",
        angkatan: "2017",
        pekerjaan: "Data Scientist",
        perusahaan: "Tokopedia",
        testimoni:
          "Saya sangat berterima kasih atas pendidikan yang saya terima. Mata kuliah seperti Machine Learning dan Data Mining sangat relevan dengan pekerjaan saya sekarang sebagai Data Scientist.",
        foto: "https://images.pexels.com/photos/14940646/pexels-photo-14940646.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        nama: "Budi Santoso",
        angkatan: "2016",
        pekerjaan: "CTO & Co-Founder",
        perusahaan: "TechStart Indonesia",
        testimoni:
          "Berkat pengalaman dan networking selama kuliah, saya bisa membangun startup teknologi yang kini telah berkembang pesat. Kegiatan kemahasiswaan juga sangat membantu mengembangkan soft skill saya.",
        foto: "https://images.pexels.com/photos/14940646/pexels-photo-14940646.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
    ]

    // Sample questions for the tracer study
    const pertanyaanTracerStudy = [
      {
        id: "Q1",
        pertanyaan: "Berapa lama waktu yang Anda butuhkan untuk mendapatkan pekerjaan pertama setelah lulus?",
        tipe: "radio",
        opsi: ["Kurang dari 3 bulan", "3-6 bulan", "6-12 bulan", "Lebih dari 12 bulan", "Belum bekerja"],
      },
      {
        id: "Q2",
        pertanyaan: "Apakah pekerjaan Anda saat ini sesuai dengan bidang studi yang Anda pelajari?",
        tipe: "radio",
        opsi: ["Sangat sesuai", "Sesuai", "Cukup sesuai", "Kurang sesuai", "Tidak sesuai"],
      },
      {
        id: "Q3",
        pertanyaan: "Berapa gaji/pendapatan Anda per bulan saat ini?",
        tipe: "radio",
        opsi: [
          "Kurang dari Rp 5 juta",
          "Rp 5 juta - Rp 10 juta",
          "Rp 10 juta - Rp 15 juta",
          "Rp 15 juta - Rp 20 juta",
          "Lebih dari Rp 20 juta",
        ],
      },
      {
        id: "Q4",
        pertanyaan: "Apa status pekerjaan Anda saat ini?",
        tipe: "radio",
        opsi: ["Bekerja (full-time)", "Bekerja (part-time)", "Wirausaha", "Melanjutkan studi", "Belum bekerja"],
      },
      {
        id: "Q5",
        pertanyaan:
          "Menurut Anda, aspek apa dari kurikulum yang perlu ditingkatkan untuk mempersiapkan mahasiswa menghadapi dunia kerja?",
        tipe: "text",
      },
    ]

    return {
      tracerStudyInfo,
      statistikAlumni,
      testimoniAlumni,
      pertanyaanTracerStudy,
    }
  }
