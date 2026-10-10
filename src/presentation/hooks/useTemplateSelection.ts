import { defaultTemplate, findTemplate, templateCatalog } from '../templates/templateCatalog'
import { usePersistentState } from './usePersistentState'

const SELECTED_TEMPLATE_KEY = 'cv-generator:selected-template'

export function useTemplateSelection() {
  const [selectedTemplateId, selectTemplate] = usePersistentState(SELECTED_TEMPLATE_KEY, defaultTemplate.id)

  return {
    templates: templateCatalog,
    selectedTemplate: findTemplate(selectedTemplateId),
    selectTemplate,
  }
}
