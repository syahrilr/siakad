import { CalendarDays, FileText } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AssignmentCardProps {
  title: string;
  description: string;
  dueDate: string;
  isSubmitted: boolean;
  attachments: string[];
}

export function AssignmentCard({
  title,
  description,
  dueDate,
  isSubmitted,
  attachments,
}: AssignmentCardProps) {
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  // Check if assignment is due soon (within 3 days)
  const isDueSoon = () => {
    const now = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && diffDays > 0;
  };

  // Check if assignment is overdue
  const isOverdue = () => {
    const now = new Date();
    const due = new Date(dueDate);
    return now > due && !isSubmitted;
  };

  return (
    <Card
      className={
        isOverdue() ? "border-red-200" : isDueSoon() ? "border-yellow-200" : ""
      }
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          {isSubmitted ? (
            <Badge className="bg-green-100 text-green-800">
              Sudah Dikumpulkan
            </Badge>
          ) : isOverdue() ? (
            <Badge className="bg-red-100 text-red-800">Terlambat</Badge>
          ) : isDueSoon() ? (
            <Badge className="bg-yellow-100 text-yellow-800">
              Segera Berakhir
            </Badge>
          ) : (
            <Badge className="bg-blue-100 text-blue-800">
              Belum Dikumpulkan
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-gray-600">{description}</p>
        <div className="mb-2 flex items-center text-sm text-gray-500">
          <CalendarDays className="mr-2 h-4 w-4" />
          <span>Tenggat: {formatDate(dueDate)}</span>
        </div>
        {attachments.length > 0 && (
          <div className="mt-2">
            <p className="mb-1 text-xs font-medium">Lampiran:</p>
            <div className="space-y-1">
              {attachments.map((attachment, index) => (
                <div key={index} className="flex items-center text-xs">
                  <FileText className="mr-1 h-3 w-3 text-gray-400" />
                  <span>{attachment}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <div className="flex w-full justify-between">
          <Button variant="outline" size="sm">
            Lihat Detail
          </Button>
          {!isSubmitted && (
            <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
              Kumpulkan Tugas
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
