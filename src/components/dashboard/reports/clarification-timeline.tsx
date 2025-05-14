import type { ReactNode } from "react";

interface TimelineItem {
  date: string;
  action: string;
  actor: string;
  icon: ReactNode;
}

interface ClarificationTimelineProps {
  items: TimelineItem[];
}

export function ClarificationTimeline({ items }: ClarificationTimelineProps) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="flex gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-full border bg-white">
            {item.icon}
          </div>
          <div className="space-y-1">
            <p className="text-sm leading-none font-medium">{item.action}</p>
            <p className="text-muted-foreground text-xs">{item.date}</p>
            <p className="text-muted-foreground text-xs">oleh {item.actor}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
