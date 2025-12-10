
import { MoreHorizontal, PlusCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import type { Post } from "@/lib/types";

const mockPosts: Post[] = [
  {
    id: "1",
    content: "Just launched my new project, DevTools Pro! It's a collection of tools for developers to boost their productivity. Check it out!",
    topic: "Project Launch",
    tone: "Professional",
    createdAt: new Date("2024-07-20T10:00:00Z"),
    status: "published",
  },
  {
    id: "2",
    content: "What are your favorite VS Code extensions? I'm always on the lookout for new ones to improve my workflow. #vscode #devtools",
    topic: "Developer Tools",
    tone: "Casual",
    createdAt: new Date("2024-07-19T15:30:00Z"),
    status: "published",
  },
  {
    id: "3",
    content: "Excited to share that I'll be speaking at the upcoming Global Tech Summit on the future of AI. Hope to see you there! #AI #Tech",
    topic: "Speaking Engagement",
    tone: "Professional",
    createdAt: new Date("2024-07-18T09:00:00Z"),
    status: "scheduled",
    scheduledAt: new Date("2024-07-25T14:00:00Z"),
  },
  {
    id: "4",
    content: "Here's a quick tip for Next.js developers: use route groups to organize your project without affecting the URL structure. Super handy!",
    topic: "Next.js Tip",
    tone: "Informal",
    createdAt: new Date("2024-07-17T12:00:00Z"),
    status: "draft",
  },
];


export default function LibraryPage() {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
              <CardTitle>Post Library</CardTitle>
              <CardDescription>
                Manage, edit, and regenerate all your posts.
              </CardDescription>
            </div>
            <Button asChild>
                <Link href="/dashboard/generator">
                    <PlusCircle className="mr-2 h-4 w-4" /> Create New Post
                </Link>
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Post</TableHead>
              <TableHead>Tone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockPosts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium max-w-sm truncate">
                  {post.content}
                </TableCell>
                <TableCell>{post.tone}</TableCell>
                <TableCell>
                  <Badge variant={post.status === 'published' ? 'default' : post.status === 'scheduled' ? 'secondary' : 'outline'}>
                    {post.status}
                  </Badge>
                </TableCell>
                <TableCell>{post.createdAt.toLocaleDateString()}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Regenerate</DropdownMenuItem>
                      <DropdownMenuItem>Schedule</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
