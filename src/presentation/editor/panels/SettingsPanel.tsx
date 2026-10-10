import type { Locale, SectionId } from '../../../domain/entities/Resume'
import { SelectField, type SelectOption } from '../fields/SelectField'
import { SectionsOrderEditor } from './SectionsOrderEditor'

const LOCALE_OPTIONS: readonly SelectOption<Locale>[] = [
  { value: 'es', label: 'Español' },
  { value: 'en', label: 'English' },
]

interface Props {
  locale: Locale
  sections: SectionId[]
  onLocaleChange: (locale: Locale) => void
  onSectionsChange: (sections: SectionId[]) => void
}

export function SettingsPanel({ locale, sections, onLocaleChange, onSectionsChange }: Props) {
  return (
    <>
      <SelectField label="Idioma del CV" value={locale} options={LOCALE_OPTIONS} onChange={onLocaleChange} />
      <h3 className="editor-subtitle">Secciones visibles y orden</h3>
      <SectionsOrderEditor value={sections} locale={locale} onChange={onSectionsChange} />
    </>
  )
}
