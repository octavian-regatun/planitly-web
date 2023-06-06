import { serverApi } from "@/server/api";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const schema = z.object({
    status: z.enum(["ACCEPTED", "PENDING"]),
  });

  let body: z.infer<typeof schema>;

  try {
    body = schema.parse(await req.json());
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { status } = body;

  try {
    if (status === "ACCEPTED")
      return NextResponse.json(
        serverApi.friendships.updateFriendship({ id: parseInt(id), status })
      );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    return NextResponse.json(
      await serverApi.friendships.deleteFriendship({ id: parseInt(id) })
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
