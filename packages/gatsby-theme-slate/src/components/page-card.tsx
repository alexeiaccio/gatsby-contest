import * as React from 'react'
import { Link } from 'gatsby'
import { Maybe, SlatePage } from '../../graphql-types'

export type PageCardProps = {
  page: Maybe<Pick<SlatePage, 'name' | 'id' | 'slug'>>
}
export const PageCard: React.FC<PageCardProps> = ({ page }) => {
  if (!page) return null
  return <Link to={page.slug}>{page.name}</Link>
}

export default PageCard
