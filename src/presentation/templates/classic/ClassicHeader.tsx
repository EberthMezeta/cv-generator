import type { PersonalInfo } from '../../../domain/entities/Resume'
import { ContactLabel } from '../../components/resume/ContactLabel'

export function ClassicHeader({ personal }: { personal: PersonalInfo }) {
  return (
    <header className="cv-header">
      <h1 className="cv-header__name">{personal.fullName}</h1>
      <ul className="cv-contact">
        {personal.contacts.map((contact) => (
          <li key={`${contact.kind}-${contact.label}`} className="cv-contact__item">
            <ContactLabel contact={contact} />
          </li>
        ))}
      </ul>
    </header>
  )
}
