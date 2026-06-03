import { google } from "googleapis";

const SHEET_NAME = "RSVP";
const HEADER_ROW = ["id", "name", "attendance", "guest_count", "message", "created_at"];

function getAuth() {
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

async function getSheets() {
  const auth = getAuth();
  return google.sheets({ version: "v4", auth });
}

const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID!;

// Pastikan sheet RSVP dan header row ada
async function ensureSheet() {
  const sheets = await getSheets();

  // Cek apakah sheet sudah ada
  const meta = await sheets.spreadsheets.get({ spreadsheetId });
  const existing = meta.data.sheets?.find(
    (s) => s.properties?.title === SHEET_NAME
  );

  if (!existing) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [{ addSheet: { properties: { title: SHEET_NAME } } }],
      },
    });
    // Tulis header row
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${SHEET_NAME}!A1`,
      valueInputOption: "RAW",
      requestBody: { values: [HEADER_ROW] },
    });
  } else {
    // Cek apakah header sudah ada
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${SHEET_NAME}!A1:F1`,
    });
    if (!res.data.values || res.data.values.length === 0) {
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `${SHEET_NAME}!A1`,
        valueInputOption: "RAW",
        requestBody: { values: [HEADER_ROW] },
      });
    }
  }
}

export async function appendRSVP(data: {
  name: string;
  attendance: string;
  guest_count: number;
  message: string;
}) {
  await ensureSheet();
  const sheets = await getSheets();

  const id = Date.now().toString();
  const created_at = new Date().toISOString();

  const row = [
    id,
    data.name,
    data.attendance,
    data.guest_count,
    data.message,
    created_at,
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${SHEET_NAME}!A:F`,
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [row] },
  });

  return { id, ...data, created_at };
}

export async function getAllRSVP() {
  await ensureSheet();
  const sheets = await getSheets();

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${SHEET_NAME}!A:F`,
  });

  const rows = res.data.values ?? [];
  if (rows.length <= 1) return []; // hanya header atau kosong

  // Skip header (baris pertama), ambil data dari baris ke-2
  const data = rows
    .slice(1)
    .filter((r) => r[0]) // filter baris kosong
    .map((r) => ({
      id: r[0] ?? "",
      name: r[1] ?? "",
      attendance: (r[2] ?? "mungkin") as "hadir" | "tidak_hadir" | "mungkin",
      guest_count: Number(r[3]) || 1,
      message: r[4] ?? "",
      created_at: r[5] ?? "",
    }))
    .reverse(); // terbaru di atas

  return data;
}
