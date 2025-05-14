import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface GradeDetailCardProps {
  course: string;
  title: string;
  grade: number;
  maxGrade: number;
  feedback: string;
  submittedAt: string;
}

export function GradeDetailCard({
  course,
  title,
  grade,
  maxGrade,
  feedback,
  submittedAt,
}: GradeDetailCardProps) {
  // Calculate grade percentage
  const percentage = (grade / maxGrade) * 100;

  // Determine grade color based on percentage
  const getGradeColor = () => {
    if (percentage >= 85) return "text-green-600";
    if (percentage >= 70) return "text-blue-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{course}</CardDescription>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${getGradeColor()}`}>
              {grade}
            </div>
            <div className="text-muted-foreground text-xs">dari {maxGrade}</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="h-2.5 w-full rounded-full bg-gray-200">
            <div
              className={`h-2.5 rounded-full ${
                percentage >= 85
                  ? "bg-green-500"
                  : percentage >= 70
                    ? "bg-blue-500"
                    : percentage >= 60
                      ? "bg-yellow-500"
                      : "bg-red-500"
              }`}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <div className="text-sm">
            <p className="mb-1 font-medium">Komentar Dosen:</p>
            <p className="text-gray-600">{feedback}</p>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Dikumpulkan pada {formatDate(submittedAt)}</span>
            <Badge variant="outline" className="bg-green-50 text-green-700">
              Sudah Dinilai
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
