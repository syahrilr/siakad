"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

interface Question {
  id: string;
  pertanyaan: string;
  tipe: string;
  opsi?: string[];
}

interface TracerStudyFormProps {
  questions: Question[];
  onCancel: () => void;
  onSubmit: (answers: Record<string, string>) => void;
}

export function TracerStudyForm({
  questions,
  onCancel,
  onSubmit,
}: TracerStudyFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleNextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(answers);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tracer Study Alumni</CardTitle>
        <CardDescription>
          Bantu kami meningkatkan kualitas pendidikan dengan mengisi tracer
          study ini
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span>Progress</span>
            <span className="font-medium">
              {Math.round(((currentStep + 1) / questions.length) * 100)}%
            </span>
          </div>
          <Progress
            value={((currentStep + 1) / questions.length) * 100}
            className="h-2"
          />
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border p-4">
            <h3 className="mb-4 text-lg font-medium">
              Pertanyaan {currentStep + 1} dari {questions.length}
            </h3>
            <p className="mb-4">{questions[currentStep].pertanyaan}</p>

            {questions[currentStep].tipe === "radio" ? (
              <RadioGroup
                value={answers[questions[currentStep].id] || ""}
                onValueChange={(value) =>
                  handleAnswerChange(questions[currentStep].id, value)
                }
                className="space-y-3"
              >
                {questions[currentStep].opsi?.map((opsi, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={opsi}
                      id={`${questions[currentStep].id}-${index}`}
                    />
                    <Label htmlFor={`${questions[currentStep].id}-${index}`}>
                      {opsi}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="feedback">Jawaban Anda</Label>
                <Textarea
                  id="feedback"
                  placeholder="Tuliskan jawaban Anda di sini..."
                  value={answers[questions[currentStep].id] || ""}
                  onChange={(e) =>
                    handleAnswerChange(
                      questions[currentStep].id,
                      e.target.value
                    )
                  }
                  rows={5}
                />
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={currentStep === 0 ? onCancel : handlePrevStep}
        >
          {currentStep === 0 ? "Batal" : "Sebelumnya"}
        </Button>
        <Button
          onClick={
            currentStep === questions.length - 1 ? handleSubmit : handleNextStep
          }
          disabled={
            questions[currentStep].tipe !== "text" &&
            !answers[questions[currentStep].id]
          }
        >
          {currentStep === questions.length - 1 ? "Kirim" : "Selanjutnya"}
        </Button>
      </CardFooter>
    </Card>
  );
}
