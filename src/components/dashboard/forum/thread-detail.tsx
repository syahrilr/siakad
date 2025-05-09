"use client";

import Link from "next/link";
import { useState } from "react";

import { ArrowLeft, Eye, Heart, MessageSquare, Share2 } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Comment, Thread, User } from "@/lib/data";

import { ReportDialog } from "../reports/report-dialog";
import { CommentForm } from "./comment-form";
import { CommentList } from "./comment-list";

interface ThreadDetailProps {
  thread: Thread;
  author: User | undefined;
  comments: Comment[];
  commentAuthors: Record<string, User | undefined>;
}

export function ThreadDetail({
  thread,
  author,
  comments,
  commentAuthors,
}: ThreadDetailProps) {
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0); // Changed from thread.likeCount || 0

  const handleReply = (commentId: string) => {
    setReplyingTo(commentId);
    // Scroll to comment form
    setTimeout(() => {
      document
        .getElementById("comment-form")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  const handleCancelReply = () => {
    setReplyingTo(null);
  };

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <div className="container mx-auto px-4 py-10 sm:px-6">
      {/* Back button */}
      <Link
        href="/dashboard/forum-diskusi"
        className="text-muted-foreground hover:text-foreground group mb-8 flex items-center text-sm transition-colors"
      >
        <div className="bg-muted group-hover:bg-primary/10 mr-2 rounded-full p-1 transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </div>
        Kembali ke Forum
      </Link>

      {/* Thread header */}
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">{thread.title}</h1>

        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border">
            <AvatarImage
              src={author?.avatar || "/placeholder.svg"}
              alt={author?.name || "User"}
            />
            <AvatarFallback>
              {author?.name?.substring(0, 2) || "U"}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="font-medium">{author?.name}</div>
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <span>
                {new Date(thread.createdAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span>•</span>
              <span className="flex items-center">
                <Eye className="mr-1 h-3.5 w-3.5" />
                {thread.viewCount} dilihat
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge
            variant="outline"
            className="bg-primary/5 hover:bg-primary/10 rounded-md px-3 py-1"
          >
            {thread.category}
          </Badge>
          {thread.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-secondary/30 hover:bg-secondary/40 rounded-md px-3 py-1"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Thread content */}
      <Card className="bg-card/50 mb-8 border-none shadow-sm">
        <CardContent className="p-6 sm:p-8">
          <div className="prose prose-slate max-w-none">
            <p className="text-base leading-relaxed">{thread.content}</p>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className={`gap-2 rounded-full px-4 ${liked ? "bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600" : ""}`}
                onClick={handleLike}
              >
                <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
                <span>{likeCount}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="gap-2 rounded-full px-4"
                onClick={() =>
                  document
                    .getElementById("comment-form")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <MessageSquare className="h-4 w-4" />
                <span>{comments.length}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="gap-2 rounded-full px-4"
              >
                <Share2 className="h-4 w-4" />
                <span>Bagikan</span>
              </Button>
            </div>

            <ReportDialog targetType="thread" targetId={thread.id} />
          </div>
        </CardContent>
      </Card>

      {/* Comments section */}
      <div className="mb-8 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Diskusi ({comments.length})</h2>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full"
            onClick={() =>
              document
                .getElementById("comment-form")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Tambahkan Komentar
          </Button>
        </div>

        {comments.length > 0 ? (
          <CommentList
            comments={comments}
            authors={commentAuthors}
            onReply={handleReply}
          />
        ) : (
          <div className="bg-muted/30 rounded-lg py-12 text-center">
            <MessageSquare className="text-muted-foreground mx-auto mb-3 h-12 w-12 opacity-50" />
            <h3 className="mb-1 text-lg font-medium">Belum ada balasan</h3>
            <p className="text-muted-foreground mb-4">
              Jadilah yang pertama memberikan balasan!
            </p>
            <Button
              variant="outline"
              onClick={() =>
                document
                  .getElementById("comment-form")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Tulis Balasan
            </Button>
          </div>
        )}
      </div>

      <Separator className="my-8" />

      {/* Comment form */}
      <div id="comment-form" className="scroll-mt-8">
        <div className="mb-4">
          <h3 className="mb-1 text-lg font-medium">
            {replyingTo ? "Balas Komentar" : "Tambahkan Balasan"}
          </h3>
          <p className="text-muted-foreground text-sm">
            {replyingTo
              ? "Anda sedang membalas komentar dari pengguna lain."
              : "Bagikan pendapat atau pertanyaan Anda terkait topik ini."}
          </p>
        </div>

        {replyingTo ? (
          <CommentForm
            threadId={thread.id}
            parentId={replyingTo}
            replyingTo={replyingTo}
            onCancelReply={handleCancelReply}
          />
        ) : (
          <CommentForm threadId={thread.id} />
        )}
      </div>
    </div>
  );
}
