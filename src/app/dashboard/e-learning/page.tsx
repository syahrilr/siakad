import type { Metadata } from "next";

import { ELearningPage } from "@/components/dashboard/e-learning";

export const metadata: Metadata = {
  title: "E-Learning - Pembelajaran Online",
  description: "Platform pembelajaran online dan materi perkuliahan",
};

export default function ELearning() {
  return <ELearningPage />;
}
