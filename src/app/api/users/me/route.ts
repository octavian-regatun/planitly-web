import { getMeUserApi } from "@/server/api/users";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    NextResponse.json(await getMeUserApi());
  } catch (error: any) {
    console.log(error)
    NextResponse.json({ error: error.message }, { status: 500 });
  }
}
