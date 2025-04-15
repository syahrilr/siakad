import type { Metadata } from "next";

import { TracerStudyPage } from "@/components/dashboard/tracer-study";

export const metadata: Metadata = {
  title: "Tracer Study - Penelusuran Alumni",
  description: "Penelusuran dan pendataan alumni",
};

export default function TracerStudy() {
  return <TracerStudyPage />;
}
