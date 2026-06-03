import { NextResponse } from "next/server";
import { appendRSVP, getAllRSVP } from "@/lib/sheets";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, attendance, guest_count, message } = body;

    if (!name?.trim() || !attendance) {
      return NextResponse.json(
        { error: "Nama dan kehadiran wajib diisi" },
        { status: 400 }
      );
    }

    const data = await appendRSVP({
      name: name.trim(),
      attendance,
      guest_count: guest_count || 1,
      message: message || "",
    });

    return NextResponse.json({ data }, { status: 201 });
  } catch (err) {
    console.error("RSVP POST error:", err);
    return NextResponse.json({ error: "Gagal menyimpan data" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const data = await getAllRSVP();
    return NextResponse.json({ data });
  } catch (err) {
    console.error("RSVP GET error:", err);
    return NextResponse.json({ error: "Gagal mengambil data" }, { status: 500 });
  }
}
