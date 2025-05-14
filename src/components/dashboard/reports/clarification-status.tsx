import { Badge } from "@/components/ui/badge";

type ClarificationStatus =
  | "Menunggu Respon"
  | "Sedang Ditinjau"
  | "Ditolak"
  | "Diterima";

interface ClarificationStatusProps {
  status: ClarificationStatus;
}

export function ClarificationStatus({ status }: ClarificationStatusProps) {
  const getStatusStyles = () => {
    switch (status) {
      case "Menunggu Respon":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "Sedang Ditinjau":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "Ditolak":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      case "Diterima":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      default:
        return "";
    }
  };

  return (
    <Badge variant="outline" className={getStatusStyles()}>
      {status}
    </Badge>
  );
}
