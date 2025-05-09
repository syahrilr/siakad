export const printStyles = `
  @media print {
    @page {
      size: A4;
      margin: 2cm 1.5cm;
      @top-center {
        content: "KARTU RENCANA STUDI (KRS)";
        font-size: 12pt;
        font-weight: bold;
      }
    }

    body {
      font-family: 'Times New Roman', serif;
      line-height: 1.5;
    }

    #print-content {
      padding: 0;
      margin: 0;
    }

    .border {
      border-color: #e5e7eb !important;
    }

    .bg-gray-50 {
      background-color: #f9fafb !important;
    }

    .badge-print {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 4px;
      border-width: 1px;
      font-size: 0.75rem;
      font-weight: 500;
    }

    .bg-blue-50 { background-color: #eff6ff !important; }
    .text-blue-800 { color: #1e40af !important; }
    .border-blue-200 { border-color: #bfdbfe !important; }

    .bg-purple-50 { background-color: #f5f3ff !important; }
    .text-purple-800 { color: #5b21b6 !important; }
    .border-purple-200 { border-color: #ddd6fe !important; }

    table {
      page-break-inside: avoid;
      border-collapse: collapse;
      width: 100%;
    }

    th, td {
      vertical-align: top;
    }

    .print-header {
      page-break-before: avoid;
      page-break-after: avoid;
    }

    .signature-space {
      page-break-inside: avoid;
    }

    .print-timestamp {
      position: fixed;
      bottom: 1cm;
      right: 1.5cm;
      font-size: 10pt;
    }
  }
`;
