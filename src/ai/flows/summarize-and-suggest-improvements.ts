'use server';
/**
 * @fileOverview Summarizes past LinkedIn post performance and suggests improvements.
 *
 * - summarizeAndSuggestImprovements - A function that handles the summarization and suggestion process.
 * - SummarizeAndSuggestImprovementsInput - The input type for the summarizeAndSuggestImprovements function.
 * - SummarizeAndSuggestImprovementsOutput - The return type for the summarizeAndSuggestImprovements function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeAndSuggestImprovementsInputSchema = z.object({
  postContents: z
    .array(z.string())
    .describe('An array of the content of the user\'s past LinkedIn posts.'),
});
export type SummarizeAndSuggestImprovementsInput = z.infer<
  typeof SummarizeAndSuggestImprovementsInputSchema
>;

const SummarizeAndSuggestImprovementsOutputSchema = z.object({
  summary: z.string().describe('A summary of which topics performed best.'),
  suggestions: z
    .string()
    .describe(
      'Suggestions on how to improve future posts to increase engagement.'
    ),
});
export type SummarizeAndSuggestImprovementsOutput = z.infer<
  typeof SummarizeAndSuggestImprovementsOutputSchema
>;

export async function summarizeAndSuggestImprovements(
  input: SummarizeAndSuggestImprovementsInput
): Promise<SummarizeAndSuggestImprovementsOutput> {
  return summarizeAndSuggestImprovementsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeAndSuggestImprovementsPrompt',
  input: {schema: SummarizeAndSuggestImprovementsInputSchema},
  output: {schema: SummarizeAndSuggestImprovementsOutputSchema},
  prompt: `You are an expert social media manager.  You will analyze a user's past LinkedIn posts and provide a summary of which topics performed best, and give suggestions on how to improve future posts to increase engagement.  The user has provided the content of their past posts.  Here they are:

{{#each postContents}}
---
{{{this}}}
{{/each}}
---`,
});

const summarizeAndSuggestImprovementsFlow = ai.defineFlow(
  {
    name: 'summarizeAndSuggestImprovementsFlow',
    inputSchema: SummarizeAndSuggestImprovementsInputSchema,
    outputSchema: SummarizeAndSuggestImprovementsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
