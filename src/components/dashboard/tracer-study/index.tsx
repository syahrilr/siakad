"use client";

import { useState } from "react";

import { Filter, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTracerStudyData } from "@/hooks/use-tracer-studi-data";

import { TracerStudyStatistics } from "./tracer-studi-statistics";
import { TracerStudyTestimonials } from "./tracer-studi-testimonial";
import { TracerStudyForm } from "./tracer-study-form";
import { TracerStudyOverview } from "./tracer-study-overview";

export function TracerStudyPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isFillingTracerStudy, setIsFillingTracerStudy] = useState(false);
  const {
    tracerStudyInfo,
    statistikAlumni,
    testimoniAlumni,
    pertanyaanTracerStudy,
  } = useTracerStudyData();

  const handleStartTracerStudy = () => {
    setIsFillingTracerStudy(true);
  };

  const handleCancelTracerStudy = () => {
    setIsFillingTracerStudy(false);
  };

  const handleSubmitTracerStudy = (answers: Record<string, string>) => {
    // In a real app, you would submit the answers to the server here
    console.log("Submitting answers:", answers);
    setIsFillingTracerStudy(false);
  };

  return (
    <div className="container mx-auto mt-10 space-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Tracer Study</h2>
          <p className="text-muted-foreground">
            Penelusuran dan pendataan alumni
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-full md:w-auto">
            <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
            <Input
              type="search"
              placeholder="Cari alumni..."
              className="w-full pl-8 md:w-[200px] lg:w-[300px]"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      {isFillingTracerStudy ? (
        <TracerStudyForm
          questions={pertanyaanTracerStudy}
          onCancel={handleCancelTracerStudy}
          onSubmit={handleSubmitTracerStudy}
        />
      ) : (
        <Tabs
          defaultValue="overview"
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList>
            <TabsTrigger value="overview">Ringkasan</TabsTrigger>
            <TabsTrigger value="statistik">Statistik Alumni</TabsTrigger>
            <TabsTrigger value="testimoni">Testimoni Alumni</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <TracerStudyOverview
              tracerStudyInfo={tracerStudyInfo}
              statistikAlumni={statistikAlumni}
              onStartTracerStudy={handleStartTracerStudy}
            />
          </TabsContent>

          <TabsContent value="statistik">
            <TracerStudyStatistics statistikAlumni={statistikAlumni} />
          </TabsContent>

          <TabsContent value="testimoni">
            <TracerStudyTestimonials testimoniAlumni={testimoniAlumni} />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
