import { isNonEmptyString } from 'jet-validators';

import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import { RouteError } from '@src/common/utils/route-errors';
import { CachedIssue } from '@src/repos/IssueRepo';
import IssueService from '@src/services/IssueService';
import LLMService from '@src/services/LLMService';

import { Req, Res } from './common/express-types';
import parseReq from './common/parseReq';

const reqValidators = {
  analyze: parseReq({
    repo: isNonEmptyString,
    prompt: isNonEmptyString,
  }),
} as const;

function buildPrompt(userPrompt: string, issues: CachedIssue[]) {
  const formattedIssues = issues
    .map((i, idx) => `Issue ${idx + 1}: ${i.title}\n${i.body}`)
    .join('\n\n');

  return `
You are analyzing GitHub issues for a repository.

User request:
${userPrompt}

Issues:
${formattedIssues}

Provide a concise, actionable analysis.
`;
}

async function analyze(req: Req, res: Res) {
  const { repo, prompt } = reqValidators.analyze(req.body);

  const issues = IssueService.getIssuesByRepo(repo);

  if (issues.length === 0) {
    throw new RouteError(
      HttpStatusCodes.BAD_REQUEST,
      'Repository not scanned or no issues found',
    );
  }

  const llmPrompt = buildPrompt(prompt, issues);
  const analysis = await LLMService.analyze(llmPrompt);

  return res.status(HttpStatusCodes.OK).json({ analysis });
}

export default {
  analyze,
} as const;
