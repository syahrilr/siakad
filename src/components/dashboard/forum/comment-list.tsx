import { CommentCard } from "@/components/dashboard/forum/comment-card";
import type { Comment, User } from "@/lib/data";

interface CommentListProps {
  comments: Comment[];
  authors: Record<string, User | undefined>;
  onReply?: (commentId: string) => void;
}

export function CommentList({ comments, authors, onReply }: CommentListProps) {
  // Separate top-level comments and replies
  const topLevelComments = comments.filter((comment) => !comment.parentId);
  const replies = comments.filter((comment) => comment.parentId);

  // Group replies by parent comment ID
  const repliesByParentId = replies.reduce(
    (acc, reply) => {
      if (!reply.parentId) return acc;
      if (!acc[reply.parentId]) {
        acc[reply.parentId] = [];
      }
      acc[reply.parentId].push(reply);
      return acc;
    },
    {} as Record<string, Comment[]>
  );

  return (
    <div className="space-y-6">
      {topLevelComments.map((comment) => (
        <div key={comment.id} className="space-y-3">
          <CommentCard
            comment={comment}
            author={authors[comment.authorId]}
            onReply={onReply}
          />

          {/* Render replies to this comment */}
          {repliesByParentId[comment.id]?.length > 0 && (
            <div className="border-muted ml-6 space-y-3 border-l-2 pt-2 pl-6">
              {repliesByParentId[comment.id].map((reply) => (
                <CommentCard
                  key={reply.id}
                  comment={reply}
                  author={authors[reply.authorId]}
                  isNested={true}
                  onReply={onReply}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
