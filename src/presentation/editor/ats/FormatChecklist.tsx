import { FaCircleCheck, FaCircleExclamation, FaCircleInfo, FaTriangleExclamation } from 'react-icons/fa6'
import type { AtsCheck } from '../../../domain/ats/formatChecks'

function CheckIcon({ check }: { check: AtsCheck }) {
  if (check.passed) return <FaCircleCheck className="ats-check__icon ats-check__icon--passed" aria-label="Cumple" />
  if (check.severity === 'informative') {
    return <FaCircleInfo className="ats-check__icon ats-check__icon--informative" aria-label="Nota" />
  }
  if (check.severity === 'critical') {
    return <FaCircleExclamation className="ats-check__icon ats-check__icon--critical" aria-label="Importante" />
  }
  return <FaTriangleExclamation className="ats-check__icon ats-check__icon--recommended" aria-label="Recomendado" />
}

export function FormatChecklist({ checks }: { checks: readonly AtsCheck[] }) {
  return (
    <ul className="ats-checklist">
      {checks.map((check) => (
        <li key={check.id} className="ats-check">
          <CheckIcon check={check} />
          <div>
            <span className="ats-check__label">{check.label}</span>
            {!check.passed && <p className="ats-check__advice">{check.advice}</p>}
          </div>
        </li>
      ))}
    </ul>
  )
}
