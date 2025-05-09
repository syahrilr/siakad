import Link from "next/link";

import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import { Clock, Eye, MessageSquare } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Thread, User } from "@/lib/data";

interface ThreadCardProps {
  thread: Thread;
  author: User | undefined;
  commentCount: number;
}

export function ThreadCard({ thread, author, commentCount }: ThreadCardProps) {
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-lg font-medium">
            <Link
              href={`/dashboard/forum-diskusi/${thread.id}`}
              className="hover:underline"
            >
              {thread.title}
            </Link>
          </CardTitle>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">{thread.category}</Badge>
            {thread.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        {thread.isPinned && (
          <Badge variant="default" className="ml-2">
            Pinned
          </Badge>
        )}
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-2 text-sm">
          {thread.content}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-muted-foreground flex items-center space-x-4 text-sm">
          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            <span>{thread.viewCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            <span>{commentCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>
              {formatDistanceToNow(new Date(thread.createdAt), {
                locale: id,
                addSuffix: true,
              })}
            </span>
          </div>
        </div>
        <UserInfo user={author} />
      </CardFooter>
    </Card>
  );
}

interface UserInfoProps {
  user: User | undefined;
}

export function UserInfo({ user }: UserInfoProps) {
  if (!user) return null;

  return (
    <div className="flex items-center space-x-2">
      <Avatar className="h-6 w-6">
        <AvatarImage
          src={user.avatar || "/placeholder.svg"}
          alt={user.name || "User"}
        />
        <AvatarFallback>{user.name?.substring(0, 2) || "U"}</AvatarFallback>
      </Avatar>
      <div className="text-muted-foreground text-sm">{user.name}</div>
    </div>
  );
}
