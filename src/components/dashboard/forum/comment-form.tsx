"use client";

import type React from "react";
import { useState } from "react";

import { SendHorizontal } from "lucide-react";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { getUserById } from "@/lib/data";

interface CommentFormProps {
  threadId: string;
  parentId?: string;
  onSuccess?: () => void;
  replyingTo?: string;
  onCancelReply?: () => void;
}

export function CommentForm({ replyingTo, onCancelReply }: CommentFormProps) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get the user being replied to if replyingTo is provided
  const replyingToUser = replyingTo ? getUserById(replyingTo) : null;

  // Mock current user - in a real app, this would come from authentication
  const currentUser = {
    id: "user-3",
    name: "Citra",
    avatar: "/placeholder.svg?height=40&width=40",
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!content.trim()) {
      toast.error("Konten tidak boleh kosong", {
        description: "Silakan tulis balasan Anda.",
        richColors: true,
      });
      return;
    }

    setIsSubmitting(true);
  };

  return (
    <Card className="border shadow-sm">
      {replyingTo && replyingToUser && (
        <div className="bg-muted/50 border-b px-4 py-2 text-sm">
          <span className="text-muted-foreground">Membalas komentar dari </span>
          <span className="font-medium">{replyingToUser.name}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <CardContent className="p-4">
          <div className="flex gap-3">
            <Avatar className="h-9 w-9 border">
              <AvatarImage
                src={currentUser.avatar || "/placeholder.svg"}
                alt={currentUser.name}
              />
              <AvatarFallback>
                {currentUser.name.substring(0, 2)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <Textarea
                placeholder={
                  replyingTo
                    ? `Tulis balasan Anda untuk ${replyingToUser?.name}...`
                    : "Tulis balasan Anda..."
                }
                className="bg-muted/30 min-h-[120px] resize-none border-none focus-visible:ring-1"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="bg-muted/10 flex justify-between border-t px-4 py-3">
          {replyingTo && onCancelReply && (
            <Button
              type="button"
              variant="ghost"
              onClick={onCancelReply}
              size="sm"
            >
              Batal
            </Button>
          )}

          <div className={`${replyingTo && onCancelReply ? "" : "ml-auto"}`}>
            <Button
              type="submit"
              disabled={isSubmitting}
              size="sm"
              className="gap-2 rounded-full px-4"
            >
              {isSubmitting ? "Mengirim..." : "Kirim Balasan"}
              <SendHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
