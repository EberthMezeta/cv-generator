import { useState } from 'react'
import { useMediaQuery } from './useMediaQuery'
import { usePersistentState } from './usePersistentState'

const COMPACT_LAYOUT_QUERY = '(max-width: 960px)'
const PREVIEW_VISIBLE_KEY = 'cv-generator:preview-visible'

export function useWorkspaceLayout() {
  const isCompact = useMediaQuery(COMPACT_LAYOUT_QUERY)
  const [isPreviewPinned, setPreviewPinned] = usePersistentState(PREVIEW_VISIBLE_KEY, true)
  const [isShowingPreviewOnCompact, setShowingPreviewOnCompact] = useState(false)

  const isPreviewVisible = isCompact ? isShowingPreviewOnCompact : isPreviewPinned
  const isEditorVisible = !isCompact || !isShowingPreviewOnCompact

  const togglePreview = () => {
    if (isCompact) setShowingPreviewOnCompact((showing) => !showing)
    else setPreviewPinned((pinned) => !pinned)
  }

  return { isCompact, isPreviewVisible, isEditorVisible, togglePreview }
}
