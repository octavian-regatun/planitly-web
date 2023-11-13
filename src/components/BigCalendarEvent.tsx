import { useDeleteEvent } from "@/hooks/use-delete-event";
import { Event } from "@/services/events";
import fontColorContrast from "font-color-contrast";
import Link from "next/link";
import { EventWrapperProps } from "react-big-calendar";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "./shadcn/context-menu";

interface Props extends EventWrapperProps {}

export function BigCalendarEvent(props: Props) {
  const event = props.event.resource as Event;

  const deleteEvent = useDeleteEvent();

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <Link href={`/events/${event.id}`}>
          <div
            style={{
              backgroundColor: event.color,
              color: fontColorContrast(event.color, 0.75),
            }}
            className="p-1 text-xs rounded hover:brightness-90 transition-all"
          >
            {event.title}
          </div>
        </Link>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={() => deleteEvent.mutate(event.id)}>
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
