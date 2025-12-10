
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Bot, Calendar, Library, Sparkles } from "lucide-react";
import { doc, getDoc } from "firebase/firestore";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/use-auth";
import { db } from "@/lib/firebase";

const navItems = [
  {
    title: "AI Post Generator",
    description: "Create your next viral post.",
    icon: Sparkles,
    href: "/dashboard/generator",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
  {
    title: "Post Library",
    description: "Manage all your content.",
    icon: Library,
    href: "/dashboard/library",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    title: "Content Calendar",
    description: "Plan your posting schedule.",
    icon: Calendar,
    href: "/dashboard/calendar",
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
];

const FREE_PLAN_POST_LIMIT = 5;

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    postsGenerated: 0,
    postsScheduled: 0,
    freePostsRemaining: 0,
    plan: 'free',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUserData() {
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            const postCount = userData.postCount || 0;
            const plan = userData.plan || 'free';
            
            let freePostsRemaining = 0;
            if (plan === 'free') {
                freePostsRemaining = Math.max(0, FREE_PLAN_POST_LIMIT - postCount);
            }

            // TODO: Fetch scheduled posts count
            setStats({
              postsGenerated: postCount,
              postsScheduled: 0, // Placeholder
              freePostsRemaining,
              plan: plan,
            });
          } else {
             // New user who hasn't generated any posts yet
            setStats({
                postsGenerated: 0,
                postsScheduled: 0,
                freePostsRemaining: FREE_PLAN_POST_LIMIT,
                plan: 'free',
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
           setStats({
                postsGenerated: 0,
                postsScheduled: 0,
                freePostsRemaining: FREE_PLAN_POST_LIMIT,
                plan: 'free',
            });
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    }

    fetchUserData();
  }, [user]);
  
  const statCards = [
    { title: "Total Posts Generated", value: stats.postsGenerated, icon: Bot },
    { title: "Posts Scheduled", value: stats.postsScheduled, icon: Calendar },
    { title: "Free Posts Remaining", value: stats.freePostsRemaining, icon: Sparkles, highlight: stats.plan === 'free' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-headline">
          Dashboard
        </h1>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s an overview of your account.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {isLoading ? (
            <>
                <Skeleton className="h-[125px]" />
                <Skeleton className="h-[125px]" />
                <Skeleton className="h-[125px]" />
            </>
        ) : (
            statCards.map((stat) => (
            (stat.title === "Free Posts Remaining" && stats.plan !== 'free') ? null :
            <Card key={stat.title} className={stat.highlight ? "border-primary" : ""}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                {stat.highlight && (
                    <Button size="sm" variant="link" asChild className="p-0 h-auto mt-1">
                    <Link href="/dashboard/upgrade">Upgrade now</Link>
                    </Button>
                )}
                </CardContent>
            </Card>
            ))
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {navItems.map((item) => (
          <Card key={item.title} className="hover:shadow-md transition-shadow">
            <Link href={item.href} className="block h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-full ${item.bgColor}`}>
                    <item.icon className={`h-6 w-6 ${item.color}`} />
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-lg">{item.title}</CardTitle>
                <CardDescription className="mt-1">{item.description}</CardDescription>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
