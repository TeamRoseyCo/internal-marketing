// src/app/api/newsletter/route.ts
// Newsletter signup endpoint — stores subscriber in Supabase newsletter_signups table.

import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

interface SignupData {
  firstName: string;
  email: string;
  locale?: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: SignupData = await request.json();

    if (!data.firstName?.trim() || !data.email?.trim()) {
      return NextResponse.json({ error: "First name and email are required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const supabase = createServerClient();
    const { error: dbError } = await supabase.from("newsletter_signups").insert({
      first_name: data.firstName.trim(),
      email: data.email.trim().toLowerCase(),
      locale: data.locale || null,
      source: "newsletter_page",
      created_at: new Date().toISOString(),
    });

    if (dbError && dbError.code !== "23505") {
      // 23505 = unique violation; treat duplicate signups as success
      console.error("Newsletter signup error:", dbError);
      return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter route error:", error);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
