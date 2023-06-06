import { serverApi } from "@/server/api";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  try {
    return NextResponse.json(
      await serverApi.events.deleteEvent({ id: parseInt(id) })
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
