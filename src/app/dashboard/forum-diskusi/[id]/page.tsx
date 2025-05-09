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
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const thread = await getThreadById(id);

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
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const thread = await getThreadById(id);

  if (!thread) {
    notFound(); // This will trigger the not-found page [^3]
  }

  const author = await getUserById(thread.authorId);
  const comments = await getCommentsByThreadId(thread.id);

  const commentAuthors = await Promise.all(
    comments.map(async (comment) => ({
      [comment.authorId]: await getUserById(comment.authorId),
    }))
  );

  const commentAuthorsMap = commentAuthors.reduce(
    (acc, curr) => {
      return { ...acc, ...curr };
    },
    {} as Record<string, User | undefined>
  );

  return (
    <ThreadDetail
      thread={thread}
      author={author}
      comments={comments}
      commentAuthors={commentAuthorsMap}
    />
  );
}
