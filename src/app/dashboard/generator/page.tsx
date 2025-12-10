
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Sparkles, Copy, Save, Wand2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { generateLinkedInPost } from "@/ai/flows/generate-linkedin-post";

const formSchema = z.object({
  topic: z.string().min(5, "Topic must be at least 5 characters."),
  tone: z.string().min(1, "Please select a tone."),
  keywords: z.string().optional(),
  targetAudience: z.string().min(2, "Please specify the target audience."),
  goal: z.string().min(1, "Please select a goal."),
});

export default function GeneratorPage() {
  const [generatedPost, setGeneratedPost] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
      tone: "professional",
      keywords: "",
      targetAudience: "",
      goal: "inform",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setGeneratedPost("");
    try {
      const result = await generateLinkedInPost({
        ...values,
        keywords: values.keywords || "",
      });
      setGeneratedPost(result.post);
      toast({ title: "Post generated successfully!" });
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: "An error occurred while generating the post.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPost);
    toast({ description: "Post copied to clipboard." });
  };
  
  const handleSave = () => {
    // This is where you would save the post to Firestore
    toast({ description: "Post saved to your library." });
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>AI Post Generator</CardTitle>
          <CardDescription>
            Fill in the details below to generate a new LinkedIn post.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Topic</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., The future of AI in marketing" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tone</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a tone" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="humorous">Humorous</SelectItem>
                        <SelectItem value="inspirational">Inspirational</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="targetAudience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Audience</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Software engineers, marketers" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="goal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Goal of the Post</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a goal" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="inform">Inform</SelectItem>
                        <SelectItem value="promote">Promote a product/service</SelectItem>
                        <SelectItem value="engage">Engage with audience</SelectItem>
                        <SelectItem value="build-brand">Build personal brand</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="keywords"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Keywords (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., AI, SaaS, growth" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Generate Post
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>Generated Post</CardTitle>
          <CardDescription>
            Review your AI-generated post below.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <Textarea
            className="h-full min-h-[300px] resize-none"
            placeholder={isLoading ? "Generating your post..." : "Your generated post will appear here."}
            value={generatedPost}
            readOnly
          />
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleCopy} disabled={!generatedPost}>
            <Copy className="mr-2 h-4 w-4" />
            Copy
          </Button>
          <Button onClick={handleSave} disabled={!generatedPost}>
            <Save className="mr-2 h-4 w-4" />
            Save to Library
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
