'use server';

/**
 * @fileOverview Provides AI-generated insights about potential issues with an expense, like inflated pricing or unusual vendors.
 *
 * - aiIssuesInsight - A function that provides insights about potential issues with an expense.
 * - AIIssuesInsightInput - The input type for the aiIssuesInsight function.
 * - AIIssuesInsightOutput - The return type for the aiIssuesInsight function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIIssuesInsightInputSchema = z.object({
  expenseDescription: z
    .string()
    .describe('The description of the expense, including item descriptions, quantities, and prices.'),
  vendorInformation: z.string().describe('Information about the vendor.'),
  departmentSpendingData: z
    .string()
    .describe('Spending data for the department related to this expense.'),
});
export type AIIssuesInsightInput = z.infer<typeof AIIssuesInsightInputSchema>;

const AIIssuesInsightOutputSchema = z.object({
  insights: z.string().describe('AI-generated insights about potential issues with the expense.'),
});
export type AIIssuesInsightOutput = z.infer<typeof AIIssuesInsightOutputSchema>;

export async function aiIssuesInsight(input: AIIssuesInsightInput): Promise<AIIssuesInsightOutput> {
  return aiIssuesInsightFlow(input);
}

const aiIssuesInsightPrompt = ai.definePrompt({
  name: 'aiIssuesInsightPrompt',
  input: {schema: AIIssuesInsightInputSchema},
  output: {schema: AIIssuesInsightOutputSchema},
  prompt: `You are an AI assistant that reviews expenses and provides insights about potential issues.

  Analyze the expense description, vendor information, and department spending data to identify any potential issues like inflated pricing or unusual vendors.

  Expense Description: {{{expenseDescription}}}
  Vendor Information: {{{vendorInformation}}}
  Department Spending Data: {{{departmentSpendingData}}}

  Provide your insights in a concise and easy-to-understand manner.
  `,
});

const aiIssuesInsightFlow = ai.defineFlow(
  {
    name: 'aiIssuesInsightFlow',
    inputSchema: AIIssuesInsightInputSchema,
    outputSchema: AIIssuesInsightOutputSchema,
  },
  async input => {
    const {output} = await aiIssuesInsightPrompt(input);
    return output!;
  }
);
