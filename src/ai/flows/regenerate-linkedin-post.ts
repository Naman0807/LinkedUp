'use server';

/**
 * @fileOverview A flow to regenerate a LinkedIn post.
 *
 * - regenerateLinkedInPost - A function that handles the regeneration of a LinkedIn post.
 * - RegenerateLinkedInPostInput - The input type for the regenerateLinkedInPost function.
 * - RegenerateLinkedInPostOutput - The return type for the regenerateLinkedInPost function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RegenerateLinkedInPostInputSchema = z.object({
  originalPost: z
    .string()
    .describe('The original LinkedIn post to regenerate.'),
  topic: z.string().describe('The topic of the LinkedIn post.'),
  tone: z.string().describe('The desired tone of the LinkedIn post.'),
});
export type RegenerateLinkedInPostInput = z.infer<typeof RegenerateLinkedInPostInputSchema>;

const RegenerateLinkedInPostOutputSchema = z.object({
  regeneratedPost: z
    .string()
    .describe('The regenerated LinkedIn post.'),
});
export type RegenerateLinkedInPostOutput = z.infer<typeof RegenerateLinkedInPostOutputSchema>;

export async function regenerateLinkedInPost(
  input: RegenerateLinkedInPostInput
): Promise<RegenerateLinkedInPostOutput> {
  return regenerateLinkedInPostFlow(input);
}

const regenerateLinkedInPostPrompt = ai.definePrompt({
  name: 'regenerateLinkedInPostPrompt',
  input: {schema: RegenerateLinkedInPostInputSchema},
  output: {schema: RegenerateLinkedInPostOutputSchema},
  prompt: `You are an expert social media manager.
  The user wants to regenerate their LinkedIn post with the following specifications:

  Topic: {{{topic}}}
  Tone: {{{tone}}}
  Original Post: {{{originalPost}}}

  Please generate a new LinkedIn post based on the topic and tone, but make sure it is different from the original post.
  DO NOT mention that this is a regenerated post.
  DO NOT include any introductory or concluding remarks.
  `,
});

const regenerateLinkedInPostFlow = ai.defineFlow(
  {
    name: 'regenerateLinkedInPostFlow',
    inputSchema: RegenerateLinkedInPostInputSchema,
    outputSchema: RegenerateLinkedInPostOutputSchema,
  },
  async input => {
    const {output} = await regenerateLinkedInPostPrompt(input);
    return output!;
  }
);
