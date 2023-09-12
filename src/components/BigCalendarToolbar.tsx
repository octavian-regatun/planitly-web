import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import { ToolbarProps } from "react-big-calendar";
import { Button } from "./shadcn/Button";
import { NewEventDialog } from "./NewEventDialog";

export function BigCalendarToolbar(props: ToolbarProps) {
  const { onNavigate, date } = props;
  return (
    <div className="mb-4 flex items-center justify-center">
      <Button size="icon" onClick={() => onNavigate("PREV")}>
        <ArrowLeftIcon className="h-4 w-4" />
      </Button>
      <p className="flex-1 text-center text-2xl">
        {dayjs(date).format("MMMM, YYYY")}
      </p>
      <Button className="mr-4" size="icon" onClick={() => onNavigate("NEXT")}>
        <ArrowRightIcon className="h-4 w-4" />
      </Button>
      <NewEventDialog />
    </div>
  );
}
