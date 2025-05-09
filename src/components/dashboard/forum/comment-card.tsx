"use client";

import { useState } from "react";

import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import {
  CheckCircle2,
  Heart,
  MessageSquare,
  MoreHorizontal,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Comment, User } from "@/lib/data";

import { ReportDialog } from "../reports/report-dialog";

interface CommentCardProps {
  comment: Comment;
  author: User | undefined;
  isNested?: boolean;
  onReply?: (commentId: string) => void;
}

export function CommentCard({
  comment,
  author,
  isNested = false,
  onReply,
}: CommentCardProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0); // Changed from comment.likes || 0

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <Card className="bg-card/50 hover:bg-card/80 border-none shadow-sm transition-colors">
      <CardContent className="p-4">
        <div className="flex gap-3">
          <Avatar className="h-9 w-9 border">
            <AvatarImage
              src={author?.avatar || "/placeholder.svg"}
              alt={author?.name || "User"}
            />
            <AvatarFallback>
              {author?.name?.substring(0, 2) || "U"}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{author?.name}</span>
                {author?.role === "admin" && (
                  <Badge
                    variant="outline"
                    className="h-5 border-blue-200 bg-blue-50 px-1.5 py-0 text-xs text-blue-700"
                  >
                    Admin
                  </Badge>
                )}
                {author?.role === "lecturer" && (
                  <Badge
                    variant="outline"
                    className="h-5 border-purple-200 bg-purple-50 px-1.5 py-0 text-xs text-purple-700"
                  >
                    Dosen
                  </Badge>
                )}
                {comment.isAccepted && (
                  <Badge className="h-5 border-green-200 bg-green-50 px-1.5 py-0 text-xs text-green-700">
                    <CheckCircle2 className="mr-1 h-3 w-3" />
                    Jawaban Terbaik
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-1">
                <span className="text-muted-foreground text-xs">
                  {formatDistanceToNow(new Date(comment.createdAt), {
                    locale: id,
                    addSuffix: true,
                  })}
                </span>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <ReportDialog
                        targetType="comment"
                        targetId={comment.id}
                        className="flex w-full justify-start"
                      />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="text-sm leading-relaxed">{comment.content}</div>

            <div className="flex items-center gap-2 pt-1">
              <Button
                variant="ghost"
                size="sm"
                className={`h-7 gap-1 rounded-full px-2 text-xs ${liked ? "bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600" : ""}`}
                onClick={handleLike}
              >
                <Heart
                  className={`h-3.5 w-3.5 ${liked ? "fill-current" : ""}`}
                />
                <span>{likeCount > 0 ? likeCount : ""}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="h-7 gap-1 rounded-full px-2 text-xs"
                onClick={() => onReply && onReply(comment.id)}
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span>Balas</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
