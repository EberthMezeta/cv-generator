import { useEffect } from 'react'
import type { Resume } from '../../../domain/entities/Resume'
import { useElementSize } from '../../hooks/useElementSize'
import type { ResumeTemplate } from '../../templates/ResumeTemplate'

const LETTER_PAGE_WIDTH_PX = 816
const LETTER_PAGE_HEIGHT_PX = 1056
const GUTTER_PX = 32

function countPrintedPages(contentHeightPx: number): number {
  return Math.max(1, Math.ceil((contentHeightPx - 1) / LETTER_PAGE_HEIGHT_PX))
}

function fitToWidthScale(availableWidthPx: number): number {
  if (!availableWidthPx) return 1
  return Math.min(1, (availableWidthPx - GUTTER_PX) / LETTER_PAGE_WIDTH_PX)
}

interface Props {
  resume: Resume
  template: ResumeTemplate
  onPageCountChange: (count: number) => void
}

export function PreviewPane({ resume, template, onPageCountChange }: Props) {
  const [paneRef, pane] = useElementSize<HTMLDivElement>()
  const [pageRef, page] = useElementSize<HTMLElement>()

  const scale = fitToWidthScale(pane.width)

  useEffect(() => {
    if (page.height) onPageCountChange(countPrintedPages(page.height))
  }, [page.height, onPageCountChange])

  return (
    <div ref={paneRef} className="preview">
      <div
        className="preview__frame"
        style={{ width: LETTER_PAGE_WIDTH_PX * scale, height: (page.height || LETTER_PAGE_HEIGHT_PX) * scale }}
      >
        <div className="preview__sheet" style={{ transform: `scale(${scale})` }}>
          <template.Document ref={pageRef} resume={resume} />
        </div>
      </div>
    </div>
  )
}
