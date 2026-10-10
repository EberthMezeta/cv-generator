import type { ReactNode } from 'react'
import { FaArrowDown, FaArrowUp, FaPlus, FaTrash } from 'react-icons/fa6'
import { IconButton } from './IconButton'
import { moveItem, removeAt, replaceAt } from './listOperations'

interface Props<T> {
  items: readonly T[]
  onChange: (items: T[]) => void
  createItem: () => T
  addLabel: string
  getItemTitle: (item: T, index: number) => string
  renderItem: (item: T, onItemChange: (item: T) => void) => ReactNode
  variant?: 'card' | 'compact'
}

export function ListEditor<T>({
  items,
  onChange,
  createItem,
  addLabel,
  getItemTitle,
  renderItem,
  variant = 'card',
}: Props<T>) {
  const lastIndex = items.length - 1

  return (
    <div className={`list-editor list-editor--${variant}`}>
      {items.map((item, index) => (
        <div key={index} className="list-editor__item">
          <div className="list-editor__header">
            <span className="list-editor__title">{getItemTitle(item, index)}</span>
            <IconButton
              label="Mover arriba"
              icon={FaArrowUp}
              disabled={index === 0}
              onClick={() => onChange(moveItem(items, index, index - 1))}
            />
            <IconButton
              label="Mover abajo"
              icon={FaArrowDown}
              disabled={index === lastIndex}
              onClick={() => onChange(moveItem(items, index, index + 1))}
            />
            <IconButton
              label="Eliminar"
              icon={FaTrash}
              tone="danger"
              onClick={() => onChange(removeAt(items, index))}
            />
          </div>
          <div className="list-editor__body">
            {renderItem(item, (updatedItem) => onChange(replaceAt(items, index, updatedItem)))}
          </div>
        </div>
      ))}
      <button type="button" className="button button--ghost" onClick={() => onChange([...items, createItem()])}>
        <FaPlus aria-hidden="true" /> {addLabel}
      </button>
    </div>
  )
}
