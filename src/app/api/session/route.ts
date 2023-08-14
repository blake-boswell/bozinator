import { getServerSession } from "next-auth";
import { sessionOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const session = await getServerSession(sessionOptions);

  return NextResponse.json({
    authenticated: !!session,
    session,
  });
}
