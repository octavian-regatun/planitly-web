import { searchUsersApi } from "@/server/api/users";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.nextUrl);
  const query = searchParams.get("query");

  if (query === null)
    return NextResponse.json({ error: "No query provided" }, { status: 400 });

  try {
    return NextResponse.json(await searchUsersApi(query));
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
