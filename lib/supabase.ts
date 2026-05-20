import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "";

export const supabase = createClient(supabaseUrl, supabaseKey);

export type RSVPRecord = {
  id: string;
  name: string;
  attendance: "hadir" | "tidak_hadir" | "mungkin";
  guest_count: number;
  message: string;
  created_at: string;
};
