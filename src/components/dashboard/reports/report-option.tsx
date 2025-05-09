"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ReportReasonOptionsProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function ReportReasonOptions({
  value,
  onValueChange,
}: ReportReasonOptionsProps) {
  return (
    <RadioGroup
      value={value}
      onValueChange={onValueChange}
      className="space-y-2"
      required
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="misinformation" id="misinformation" />
        <Label htmlFor="misinformation">Informasi tidak akurat</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="inappropriate" id="inappropriate" />
        <Label htmlFor="inappropriate">Konten tidak pantas</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="spam" id="spam" />
        <Label htmlFor="spam">Spam atau duplikasi</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="harassment" id="harassment" />
        <Label htmlFor="harassment">
          Pelecehan atau perilaku tidak profesional
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="copyright" id="copyright" />
        <Label htmlFor="copyright">Pelanggaran hak cipta</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="other" id="other" />
        <Label htmlFor="other">Lainnya</Label>
      </div>
    </RadioGroup>
  );
}
