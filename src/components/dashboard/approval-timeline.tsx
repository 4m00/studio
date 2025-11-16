import { CheckCircle, Clock, XCircle, User } from "lucide-react";
import { cn } from "@/lib/utils";

const timelineEvents = [
  {
    status: "approved",
    user: "Иванов И.И.",
    role: "Непосредственный руководитель",
    date: "16.11.2025, 14:30",
    comment: "Срочный ремонт, согласовано.",
  },
  {
    status: "pending",
    user: "Петров П.П.",
    role: "Руководитель ЦФО",
    date: null,
    comment: null,
  },
  {
    status: "queue",
    user: "Сидоров С.С.",
    role: "Финансовый контролер",
    date: null,
    comment: null,
  },
    {
    status: "queue",
    user: "Зайцев В.Р.",
    role: "Служба безопасности",
    date: null,
    comment: null,
  },
];

const getStatusIcon = (status) => {
  switch (status) {
    case "approved":
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case "rejected":
      return <XCircle className="h-5 w-5 text-red-500" />;
    case "pending":
      return <Clock className="h-5 w-5 text-yellow-500 animate-pulse" />;
    default:
      return <User className="h-5 w-5 text-gray-400" />;
  }
};

export function ApprovalTimeline() {
  return (
    <div className="relative">
      <div className="absolute left-3.5 top-0 h-full w-0.5 bg-gray-200"></div>
      <ul className="space-y-8">
        {timelineEvents.map((event, index) => (
          <li key={index} className="flex items-start">
            <div className="z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background ring-4 ring-background">
              {getStatusIcon(event.status)}
            </div>
            <div className="ml-4">
              <h4 className={cn("font-semibold", event.status === 'pending' && 'text-primary')}>{event.user}</h4>
              <p className="text-sm text-muted-foreground">{event.role}</p>
               {event.comment && (
                  <p className="text-sm italic bg-muted/70 p-2 my-1 rounded-md">«{event.comment}»</p>
              )}
              {event.date && (
                <time className="text-xs text-muted-foreground">{event.date}</time>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
