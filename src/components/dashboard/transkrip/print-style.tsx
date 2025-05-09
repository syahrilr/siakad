export const transkripPrintStyles = `
  @media print {
    @page {
      size: A4;
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

    .academic-summary {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1cm;
      background-color: #f8f8f8;
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 0.5cm;
    }

    .academic-summary > div {
      text-align: center;
      padding: 0 1cm;
    }

    .academic-summary > div:not(:last-child) {
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

    .grade-scale {
      margin-bottom: 1cm;
      background-color: #f8f8f8;
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 0.3cm;
      font-size: 9pt;
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
