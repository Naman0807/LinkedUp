
"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"

export default function CalendarPage() {
  return (
    <div className="grid gap-6">
       <Card>
        <CardHeader>
          <CardTitle>Content Calendar</CardTitle>
          <CardDescription>
            Plan and visualize your posting schedule. Click a date to see or schedule posts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 border rounded-lg">
             <Calendar
                mode="single"
                className="p-0"
             />
          </div>
        </CardContent>
       </Card>
    </div>
  )
}
