import { serverApi } from "@/server/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.getAll("username");
  const includeMe = searchParams.get("includeMe") === "true";

  try {
    return NextResponse.json(await serverApi.users.getUsers({ includeMe }));
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
