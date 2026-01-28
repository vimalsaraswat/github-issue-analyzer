import axios from 'axios';

import EnvVars from '@src/common/constants/env';
import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import { RouteError } from '@src/common/utils/route-errors';

const GEMINI_ENDPOINT =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

const Errors = {
  LLM_FAILED: 'Failed to generate analysis from LLM',
} as const;

async function analyze(prompt: string): Promise<string> {
  try {
    const res = await axios.post<{
      candidates: { content: { parts: { text: string }[] } }[];
    }>(
      GEMINI_ENDPOINT,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: {
          'x-goog-api-key': EnvVars.GeminiApiKey,
          'Content-Type': 'application/json',
        },
        timeout: 15_000,
      },
    );

    const text = res.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error('Empty LLM response');
    }

    return text;
  } catch (err) {
    throw new RouteError(
      HttpStatusCodes.SERVICE_UNAVAILABLE,
      Errors.LLM_FAILED,
    );
  }
}

export default {
  Errors,
  analyze,
} as const;
