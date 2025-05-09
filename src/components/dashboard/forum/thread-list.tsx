import { type Thread, comments, getUserById } from "@/lib/data";

import { ThreadCard } from "./thread-card";

interface ThreadListProps {
  threads: Thread[];
}

export function ThreadList({ threads }: ThreadListProps) {
  return (
    <div className="space-y-4">
      {threads.map((thread) => {
        const author = getUserById(thread.authorId);
        const commentCount = comments.filter(
          (comment) => comment.threadId === thread.id
        ).length;
        return (
          <ThreadCard
            key={thread.id}
            thread={thread}
            author={author}
            commentCount={commentCount}
          />
        );
      })}
    </div>
  );
}
