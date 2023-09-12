import { EventResponse, eventsService } from "@/services/events";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import fontColorContrast from "font-color-contrast";
import Link from "next/link";
import { EventWrapperProps } from "react-big-calendar";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "./shadcn/ContextMenu";
import { useToast } from "./shadcn/use-toast";

interface Props extends EventWrapperProps {}

export function BigCalendarEvent(props: Props) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const event = props.event.resource as EventResponse;
  const removeEventMutation = useMutation({
    mutationFn: eventsService.removeById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast({
        title: "Event deleted 🗑️",
        description: "Your event has been deleted.",
      });
    },
  });

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <Link href="/events/:id">
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
        <ContextMenuItem onClick={()=>removeEventMutation.mutate(event.id)}>Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
