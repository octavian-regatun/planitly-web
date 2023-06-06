import { serverApi } from "@/server/api";
import { getServerAuthSession } from "@/server/auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const postSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
});

export async function POST(req: NextRequest) {
  const session = await getServerAuthSession();
  const body = postSchema.safeParse(await req.json());

  if (!body.success) {
    return NextResponse.json({ error: body.error });
  }

  const startDate = new Date(body.data.startDate);
  const endDate = new Date(body.data.endDate);

  try {
    return NextResponse.json(
      await serverApi.availabilities.create({
        startDate,
        endDate,
        isAvailable: false,
        userId: session!.user.id,
      })
    );
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to create availability" });
  }
}
