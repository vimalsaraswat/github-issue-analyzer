import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import { RouteError } from '@src/common/utils/route-errors';
import IssueRepo, { GitHubIssue } from '@src/repos/IssueRepo';

const Errors = {
  REPO_NOT_SCANNED: 'Repository not scanned or no issues found',
} as const;

function replaceRepoIssues(repo: string, issues: GitHubIssue[]) {
  return IssueRepo.replaceRepoIssues(repo, issues);
}

function getIssuesByRepo(repo: string) {
  const issues = IssueRepo.getIssuesByRepo(repo);

  if (!issues.length) {
    throw new RouteError(HttpStatusCodes.BAD_REQUEST, Errors.REPO_NOT_SCANNED);
  }

  return issues;
}

export default {
  Errors,
  replaceRepoIssues,
  getIssuesByRepo,
} as const;
