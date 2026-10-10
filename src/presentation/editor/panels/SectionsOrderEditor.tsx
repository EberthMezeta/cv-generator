import { FaArrowDown, FaArrowUp } from 'react-icons/fa6'
import type { Locale, SectionId } from '../../../domain/entities/Resume'
import { SECTION_IDS } from '../../../domain/entities/sectionIds'
import { sectionTitles } from '../../i18n/labels'
import type { EditorValueProps } from '../EditorValueProps'
import { CheckboxField } from '../fields/CheckboxField'
import { IconButton } from '../IconButton'
import { moveItem, removeAt } from '../listOperations'

interface Props extends EditorValueProps<SectionId[]> {
  locale: Locale
}

export function SectionsOrderEditor({ value, onChange, locale }: Props) {
  const titles = sectionTitles[locale]
  const hiddenSections = SECTION_IDS.filter((sectionId) => !value.includes(sectionId))
  const lastIndex = value.length - 1

  return (
    <ul className="sections-order">
      {value.map((sectionId, index) => (
        <li key={sectionId} className="sections-order__item">
          <CheckboxField label={titles[sectionId]} checked onChange={() => onChange(removeAt(value, index))} />
          <IconButton
            label="Mover arriba"
            icon={FaArrowUp}
            disabled={index === 0}
            onClick={() => onChange(moveItem(value, index, index - 1))}
          />
          <IconButton
            label="Mover abajo"
            icon={FaArrowDown}
            disabled={index === lastIndex}
            onClick={() => onChange(moveItem(value, index, index + 1))}
          />
        </li>
      ))}
      {hiddenSections.map((sectionId) => (
        <li key={sectionId} className="sections-order__item sections-order__item--hidden">
          <CheckboxField label={titles[sectionId]} checked={false} onChange={() => onChange([...value, sectionId])} />
        </li>
      ))}
    </ul>
  )
}
