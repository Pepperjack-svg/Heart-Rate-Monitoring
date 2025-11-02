import { NextResponse } from "next/server";

let latestBpm = 0;

export async function POST(req: Request) {
  const { bpm } = await req.json();
  latestBpm = bpm;
  console.log("💓 Received BPM:", bpm);
  return NextResponse.json({ success: true });
}

export async function GET() {
  return NextResponse.json({ bpm: latestBpm });
}
