import type { ResumeTemplate } from '../../templates/ResumeTemplate'

interface Props {
  templates: readonly ResumeTemplate[]
  selectedTemplateId: string
  onSelect: (templateId: string) => void
}

export function TemplatePicker({ templates, selectedTemplateId, onSelect }: Props) {
  return (
    <label className="template-picker">
      Plantilla
      <select value={selectedTemplateId} onChange={(event) => onSelect(event.target.value)}>
        {templates.map((template) => (
          <option key={template.id} value={template.id}>
            {template.name}
          </option>
        ))}
      </select>
    </label>
  )
}
