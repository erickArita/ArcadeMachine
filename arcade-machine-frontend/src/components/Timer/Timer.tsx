import { Progress } from "@nextui-org/react";

export const Timer = ({
  timer,
  maxValue,
}: {
  timer: number;
  maxValue: number;
}) => (
  <Progress
    size="lg"
    value={timer}
    minValue={0}
    maxValue={maxValue}
    aria-label="Timer"
    classNames={{
      track: "bg-foreground/20",
      indicator: "bg-gradient-to-r from-red-300 to-purple-500",
      label: "tracking-wider font-medium  text-black",
      value: "text-foreground/60",
    }}
  />
);
