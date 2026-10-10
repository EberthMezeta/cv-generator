import type { ValidationIssue } from '../../../domain/rules/validateResume'

export function ValidationBanner({ issues }: { issues: ValidationIssue[] }) {
  if (issues.length === 0) return null
  return (
    <div className="validation" role="alert">
      <strong>Revisa estos datos:</strong>
      <ul>
        {issues.map((issue) => (
          <li key={`${issue.field}-${issue.message}`}>
            <strong>{issue.field}</strong> — {issue.message}
          </li>
        ))}
      </ul>
    </div>
  )
}
