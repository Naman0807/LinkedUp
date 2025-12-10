'use server';

/**
 * @fileOverview Generates a LinkedIn post based on provided topic, tone, and other parameters.
 *
 * - generateLinkedInPost - A function that generates a LinkedIn post.
 * - GenerateLinkedInPostInput - The input type for the generateLinkedInPost function.
 * - GenerateLinkedInPostOutput - The return type for the generateLinkedInPost function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLinkedInPostInputSchema = z.object({
  topic: z.string().describe('The topic of the LinkedIn post.'),
  tone: z.string().describe('The desired tone of the LinkedIn post (e.g., professional, casual, humorous).'),
  keywords: z.string().describe('Relevant keywords to include in the post.'),
  targetAudience: z.string().describe('The target audience for the post (e.g., recruiters, software engineers, marketers).'),
  goal: z.string().describe('The goal of the post (e.g., to inform, to promote, to engage).'),
});

export type GenerateLinkedInPostInput = z.infer<typeof GenerateLinkedInPostInputSchema>;

const GenerateLinkedInPostOutputSchema = z.object({
  post: z.string().describe('The generated LinkedIn post.'),
});

export type GenerateLinkedInPostOutput = z.infer<typeof GenerateLinkedInPostOutputSchema>;

export async function generateLinkedInPost(input: GenerateLinkedInPostInput): Promise<GenerateLinkedInPostOutput> {
  return generateLinkedInPostFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateLinkedInPostPrompt',
  input: {schema: GenerateLinkedInPostInputSchema},
  output: {schema: GenerateLinkedInPostOutputSchema},
  prompt: `You are an expert LinkedIn post generator. Your goal is to create engaging and effective posts based on the provided information.

  Topic: {{{topic}}}
  Tone: {{{tone}}}
  Keywords: {{{keywords}}}
  Target Audience: {{{targetAudience}}}
  Goal: {{{goal}}}

  Generate a LinkedIn post that is appropriate for the target audience and achieves the specified goal. Ensure the post is well-written, engaging, and includes relevant keywords.  The post should be compelling and encourage interaction. The post should be 2-3 short paragraphs.
  `,
});

const generateLinkedInPostFlow = ai.defineFlow(
  {
    name: 'generateLinkedInPostFlow',
    inputSchema: GenerateLinkedInPostInputSchema,
    outputSchema: GenerateLinkedInPostOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
