import { serverApi } from "@/server/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    NextResponse.json(await serverApi.users.getMeUser());
  } catch (error: any) {
    console.log(error)
    NextResponse.json({ error: error.message }, { status: 500 });
  }
}
