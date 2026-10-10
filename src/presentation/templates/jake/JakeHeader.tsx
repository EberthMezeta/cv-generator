import type { PersonalInfo } from '../../../domain/entities/Resume'
import { ContactIcon } from '../../components/resume/ContactIcon'
import { ContactLabel } from '../../components/resume/ContactLabel'

export function JakeHeader({ personal }: { personal: PersonalInfo }) {
  return (
    <header className="cv-header">
      {personal.photo && <img className="cv-header__photo" src={personal.photo} alt="" />}
      <div className="cv-header__text">
        <h1 className="cv-header__name">{personal.fullName}</h1>
        <ul className="cv-contact">
          {personal.contacts.map((contact) => (
            <li key={`${contact.kind}-${contact.label}`} className="cv-contact__item">
              <ContactIcon kind={contact.kind} />
              <ContactLabel contact={contact} />
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
