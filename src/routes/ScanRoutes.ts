import { isNonEmptyString } from 'jet-validators';

import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import GitHubService from '@src/services/GitHubService';
import IssueService from '@src/services/IssueService';

import { Req, Res } from './common/express-types';
import parseReq from './common/parseReq';

const reqValidators = {
  scan: parseReq({
    repo: isNonEmptyString,
  }),
} as const;

async function scan(req: Req, res: Res) {
  const { repo } = reqValidators.scan(req.body);

  const issues = await GitHubService.fetchOpenIssues(repo);

  IssueService.replaceRepoIssues(repo, issues);

  return res.status(HttpStatusCodes.OK).json({
    repo,
    issues_fetched: issues.length,
    cached_successfully: true,
  });
}

export default {
  scan,
} as const;
