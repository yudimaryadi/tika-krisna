import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

function getClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(url, key);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, attendance, guest_count, message } = body;

  if (!name?.trim() || !attendance) {
    return NextResponse.json(
      { error: "Nama dan kehadiran wajib diisi" },
      { status: 400 }
    );
  }

  const { data, error } = await getClient()
    .from("rsvp")
    .insert([
      {
        name: name.trim(),
        attendance,
        guest_count: guest_count || 1,
        message: message || "",
      },
    ])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data }, { status: 201 });
}

export async function GET() {
  const { data, error } = await getClient()
    .from("rsvp")
    .select("id, name, attendance, message, created_at")
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}
