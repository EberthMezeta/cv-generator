import type { ValidationIssue } from '../../../domain/rules/validateResume'

export function ValidationBanner({ issues }: { issues: ValidationIssue[] }) {
  if (issues.length === 0) return null
  return (
    <div className="validation" role="alert">
      <strong>Revisa src/data/resume.ts:</strong>
      <ul>
        {issues.map((issue) => (
          <li key={issue.path}>
            <code>{issue.path}</code> — {issue.message}
          </li>
        ))}
      </ul>
    </div>
  )
}
