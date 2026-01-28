import axios from 'axios';

import { GitHubIssue } from '@src/repos/IssueRepo';

interface GitHubApiIssue {
  id: number;
  title: string;
  body: string | null;
  html_url: string;
  created_at: string;
}

async function fetchOpenIssues(repo: string): Promise<GitHubIssue[]> {
  const res = await axios.get<GitHubApiIssue[]>(
    `https://api.github.com/repos/${repo}/issues`,
  );
  const issues = res.data ?? [];

  return issues.map((issue) => ({
    id: issue.id,
    title: issue.title,
    body: issue.body || '',
    html_url: issue.html_url,
    created_at: issue.created_at,
  }));
}

export default {
  fetchOpenIssues,
} as const;
