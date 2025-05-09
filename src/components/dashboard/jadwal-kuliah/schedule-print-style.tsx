export const jadwalPrintStyles = `
  @media print {
    @page {
      size: A4 landscape;
      margin: 1.5cm;
    }

    body {
      font-family: 'Arial', 'Helvetica', sans-serif;
      line-height: 1.5;
      margin: 0;
      padding: 0;
      color: #000;
      background-color: #fff;
    }

    .print-content {
      padding: 0;
      margin: 0;
      position: relative;
    }

    .print-header {
      page-break-before: avoid;
      page-break-after: avoid;
    }

    .university-logo {
      border: 2px solid #000;
    }

    .document-title h1 {
      border: 2px solid #000;
      padding: 8px;
      background-color: #f8f8f8;
    }

    .student-info {
      margin-bottom: 1cm;
      background-color: #f8f8f8;
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 0.5cm;
    }

    .schedule-summary {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1cm;
      background-color: #f8f8f8;
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 0.5cm;
    }

    .schedule-summary > div {
      text-align: center;
      padding: 0 1cm;
    }

    .schedule-summary > div:not(:last-child) {
      border-right: 1px solid #ddd;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 1cm;
      page-break-inside: auto;
    }

    tr {
      page-break-inside: avoid;
      page-break-after: auto;
    }

    thead {
      display: table-header-group;
    }

    tfoot {
      display: table-footer-group;
    }

    th, td {
      border: 1px solid #000;
      padding: 0.2cm;
      text-align: left;
      vertical-align: top;
    }

    th {
      background-color: #e0e0e0;
      font-weight: bold;
    }

    tr:nth-child(even) td {
      background-color: #f9f9f9;
    }

    .text-center {
      text-align: center;
    }

    .course-type {
      display: inline-block;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 8pt;
      font-weight: bold;
      margin-right: 4px;
    }

    .course-type-lecture {
      background-color: #e3f2fd;
      border: 1px solid #90caf9;
      color: #0d47a1;
    }

    .course-type-lab {
      background-color: #f3e5f5;
      border: 1px solid #ce93d8;
      color: #6a1b9a;
    }

    .course-type-tutorial {
      background-color: #e8f5e9;
      border: 1px solid #a5d6a7;
      color: #1b5e20;
    }

    .weekly-schedule {
      border: 1px solid #000;
      margin-bottom: 1cm;
    }

    .weekly-schedule th {
      text-align: center;
      padding: 0.1cm;
    }

    .weekly-schedule td {
      height: 1cm;
      vertical-align: middle;
      padding: 0.1cm;
    }

    .weekly-schedule .time-slot {
      width: 2cm;
      text-align: center;
      font-size: 8pt;
    }

    .weekly-schedule .day-column {
      width: calc((100% - 2cm) / 5);
    }

    .course-cell {
      background-color: #f8f8f8;
      border: 1px solid #ddd;
      padding: 0.1cm;
      font-size: 8pt;
      height: 100%;
    }

    .course-cell-lecture {
      background-color: #e3f2fd;
      border: 1px solid #90caf9;
    }

    .course-cell-lab {
      background-color: #f3e5f5;
      border: 1px solid #ce93d8;
    }

    .legend {
      margin-bottom: 0.5cm;
      background-color: #f8f8f8;
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 0.3cm;
      font-size: 9pt;
      display: flex;
      gap: 1cm;
    }

    .legend-item {
      display: flex;
      align-items: center;
      gap: 0.2cm;
    }

    .legend-color {
      width: 0.5cm;
      height: 0.5cm;
      border: 1px solid #000;
    }

    .verification-signature {
      display: flex;
      justify-content: space-between;
      margin-top: 1.5cm;
    }

    .verification {
      text-align: center;
    }

    .qr-code {
      border: 1px solid #000;
      padding: 4px;
      background-color: #fff;
    }

    .signature {
      text-align: right;
      margin-top: 0.5cm;
    }

    .stamp {
      border: 1px dashed #000;
      border-radius: 50%;
      width: 2.5cm;
      height: 2.5cm;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: auto;
      margin-bottom: 0.5cm;
    }

    .signature-name {
      margin-top: 1cm;
    }

    .footer {
      margin-top: 1cm;
      border-top: 1px solid #ddd;
      padding-top: 0.2cm;
      font-size: 8pt;
      color: #666;
      display: flex;
      justify-content: space-between;
    }

    .print-timestamp {
      position: fixed;
      bottom: 1cm;
      right: 1.5cm;
      font-size: 8pt;
      color: #666;
    }
  }
`;
