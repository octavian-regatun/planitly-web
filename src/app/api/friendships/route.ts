import { serverApi } from "@/server/api";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(req: NextRequest) {
  try {
    return NextResponse.json(await serverApi.friendships.getFriendships());
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const schema = z.object({
    recipientId: z.string(),
  });

  let body: z.infer<typeof schema>;

  try {
    body = schema.parse(await req.json());
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { recipientId } = body;

  try {
    return NextResponse.json(
      await serverApi.friendships.createFriendship({ recipientId })
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
