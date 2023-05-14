import { getUserByIdApi } from "@/server/api/users";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  console.log(id);

  const user = await getUserByIdApi({ id });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}
