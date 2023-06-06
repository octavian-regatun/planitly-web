import { serverApi } from "@/server/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.nextUrl);
  const query = searchParams.get("query");

  if (query === null)
    return NextResponse.json({ error: "No query provided" }, { status: 400 });

  try {
    return NextResponse.json(await serverApi.users.searchUsers(query));
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
