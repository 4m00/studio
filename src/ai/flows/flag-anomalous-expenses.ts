'use server';

/**
 * @fileOverview This file defines a Genkit flow for flagging anomalous expense requests.
 *
 * The flow takes expense request data as input and uses an LLM to determine if the request is anomalous based on historical data and ML models.
 *
 * @interface FlagAnomalousExpensesInput - The input schema for the flagAnomalousExpenses flow.
 * @interface FlagAnomalousExpensesOutput - The output schema for the flagAnomalousExpenses flow, indicating whether the expense is flagged as anomalous.
 * @function flagAnomalousExpenses - The main function to trigger the anomaly flagging flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema for the flow
const FlagAnomalousExpensesInputSchema = z.object({
  requestId: z.string().describe('The unique identifier for the expense request.'),
  amount: z.number().describe('The amount of the expense request.'),
  category: z.string().describe('The category of the expense (e.g., Travel, Supplies).'),
  department: z.string().describe('The department making the expense request.'),
  description: z.string().describe('A detailed description of the expense request.'),
  historicalAverage: z.number().describe('The average amount for similar expenses in the past.'),
  deviationFromAverage: z
    .number()
    .describe(
      'The percentage deviation of the current expense amount from the historical average.'
    ),
  vendor: z.string().describe('The vendor associated with the expense request.'),
  requestDate: z.string().describe('The date of the expense request.'),
});

export type FlagAnomalousExpensesInput = z.infer<typeof FlagAnomalousExpensesInputSchema>;

// Define the output schema for the flow
const FlagAnomalousExpensesOutputSchema = z.object({
  isAnomalous: z.boolean().describe('Whether the expense request is flagged as anomalous.'),
  anomalyScore: z
    .number()
    .optional()
    .describe('A score indicating the degree of anomaly (higher is more anomalous).'),
  reason: z
    .string()
    .optional()
    .describe('The reason for flagging the expense as anomalous.'),
});

export type FlagAnomalousExpensesOutput = z.infer<typeof FlagAnomalousExpensesOutputSchema>;

// Exported function to call the flow
export async function flagAnomalousExpenses(
  input: FlagAnomalousExpensesInput
): Promise<FlagAnomalousExpensesOutput> {
  return flagAnomalousExpensesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'flagAnomalousExpensesPrompt',
  input: {schema: FlagAnomalousExpensesInputSchema},
  output: {schema: FlagAnomalousExpensesOutputSchema},
  prompt: `You are a financial analyst reviewing expense requests for anomalies.
  Based on the information provided, determine if the expense request is anomalous.
  Consider the amount, category, department, description, historical average, and deviation from average.
  Also consider the vendor and request date.

  Provide a brief reason for your determination.
  If the expense is flagged as anomalous, provide an anomaly score between 0 and 100, with higher scores indicating a greater degree of anomaly.

  Expense Request Details:
  - Request ID: {{{requestId}}}
  - Amount: {{{amount}}}
  - Category: {{{category}}}
  - Department: {{{department}}}
  - Description: {{{description}}}
  - Historical Average: {{{historicalAverage}}}
  - Deviation from Average: {{{deviationFromAverage}}}%
  - Vendor: {{{vendor}}}
  - Request Date: {{{requestDate}}}

  Is this expense request anomalous? Respond with a JSON object in the following format:
  {
    "isAnomalous": boolean,
    "anomalyScore": number (optional),
    "reason": string (optional)
  }`,
});

// Define the Genkit flow
const flagAnomalousExpensesFlow = ai.defineFlow(
  {
    name: 'flagAnomalousExpensesFlow',
    inputSchema: FlagAnomalousExpensesInputSchema,
    outputSchema: FlagAnomalousExpensesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
