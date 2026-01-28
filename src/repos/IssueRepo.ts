import db from '@src/db/sqlite';

export interface GitHubIssue {
  id: number;
  title: string;
  body: string;
  html_url: string;
  created_at: string;
}

export interface CachedIssue extends GitHubIssue {
  repo: string;
}

function replaceRepoIssues(repo: string, issues: GitHubIssue[]): void {
  const deleteStmt = db.prepare('DELETE FROM issues WHERE repo = ?');
  deleteStmt.run(repo);

  const insertStmt = db.prepare(`
    INSERT INTO issues (repo, id, title, body, html_url, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const insertMany = db.transaction((rows: GitHubIssue[]) => {
    for (const issue of rows) {
      insertStmt.run(
        repo,
        issue.id,
        issue.title,
        issue.body,
        issue.html_url,
        issue.created_at,
      );
    }
  });

  insertMany(issues);
}

function getIssuesByRepo(repo: string): CachedIssue[] {
  const stmt = db.prepare(`
    SELECT repo, id, title, body, html_url, created_at
    FROM issues
    WHERE repo = ?
  `);

  return stmt.all(repo) as CachedIssue[];
}

export default {
  replaceRepoIssues,
  getIssuesByRepo,
} as const;
