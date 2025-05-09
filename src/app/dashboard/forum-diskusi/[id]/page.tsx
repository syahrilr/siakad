// app/(your-path)/[id]/page.tsx atau thread/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { ThreadDetail } from "@/components/dashboard/forum/thread-detail";
import {
  type User,
  getCommentsByThreadId,
  getThreadById,
  getUserById,
} from "@/lib/data";

// Dynamic Metadata
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const thread = await getThreadById(params.id);

  if (!thread) {
    return {
      title: "Thread Not Found",
      description: "The thread you are looking for does not exist.",
    };
  }

  const author = await getUserById(thread.authorId);

  return {
    title: thread.title,
    description: `Diskusi oleh ${author?.name ?? "Unknown Author"}: ${thread.content.slice(0, 150)}...`,
    openGraph: {
      title: thread.title,
      description: thread.content.slice(0, 150),
    },
  };
}

export default async function ThreadPage({
  params,
}: {
  params: { id: string };
}) {
  const thread = getThreadById(params.id);

  if (!thread) {
    notFound();
  }

  const author = getUserById(thread.authorId);
  const comments = getCommentsByThreadId(thread.id);

  const commentAuthors = comments.reduce(
    (acc, comment) => {
      if (!acc[comment.authorId]) {
        acc[comment.authorId] = getUserById(comment.authorId);
      }
      return acc;
    },
    {} as Record<string, User | undefined>
  );

  return (
    <ThreadDetail
      thread={thread}
      author={author}
      comments={comments}
      commentAuthors={commentAuthors}
    />
  );
}
