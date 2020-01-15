import * as React from 'react'
export type ListProps<T> = { items: T[] }
export type ItemProps = {
  id?: string
  renderer: () => JSX.Element
}
export const List: React.FC<ListProps<ItemProps>> = ({ items }) => {
  if (items.length === 0) return null
  return (
    <div>
      {items.map((item: ItemProps) => (
        <div key={item.id}>{item.renderer()}</div>
      ))}
    </div>
  )
}

export default List
