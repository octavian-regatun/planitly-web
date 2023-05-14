import { createEventApi } from "@/server/api/events";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: NextRequest) {
  const schema = z.object({
    name: z.string(),
    description: z.string(),
    location: z.object({
      name: z.string(),
      address: z.string(),
      latitude: z.number(),
      longitude: z.number(),
    }),
    userIds: z.array(z.string()),
    startDate: z.string().transform(date => new Date(date)),
    endDate: z.string().transform(date => new Date(date)),
    allDay: z.boolean(),
  });

  const body = schema.safeParse(await req.json());

  if (!body.success) {
    console.log(body.error);
    return NextResponse.json({ error: body.error }, { status: 500 });
  }

  const { name, description, location, userIds, startDate, endDate, allDay } =
    body.data;

  try {
    return NextResponse.json(
      await createEventApi({
        name,
        description,
        location,
        userIds,
        startDate,
        endDate,
        allDay,
      })
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
