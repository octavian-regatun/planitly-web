import clsx from "clsx";
import { Button } from "./shadcn/Button";
import { Popover, PopoverContent, PopoverTrigger } from "./shadcn/Popover";
import {
  blue,
  red,
  green,
  yellow,
  purple,
  orange,
  indigo,
  pink,
} from "tailwindcss/colors";
import { Card, CardContent, CardHeader, CardTitle } from "./shadcn/Card";
import { PopoverClose } from "@radix-ui/react-popover";

const colors = [
  blue["500"],
  red["500"],
  green["500"],
  yellow["500"],
  purple["500"],
  orange["500"],
];

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function ColorPicker({ value, onChange }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="w-4 h-4 rounded-full transition-all hover:scale-110 hover:brightness-90"
          style={{ backgroundColor: value }}
        />
      </PopoverTrigger>
      <PopoverContent>
        <p className="font-medium">Pick a Color</p>
        <p className="text-sm text-muted-foreground">
          This is the color displayed in the calendar.
        </p>
        <div className="flex gap-2 mt-4">
          {colors.map(color => (
            <PopoverClose asChild key={color}>
              <button
                className="w-6 h-6 rounded-full transition-all hover:scale-110 hover:brightness-90"
                style={{ backgroundColor: color }}
                onClick={() => onChange(color)}
              />
            </PopoverClose>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
