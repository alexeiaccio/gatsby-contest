import React from 'react'
import { graphql } from 'gatsby'
import { PageQueryQuery } from '../../graphql-types'

export const query = graphql`
  query PageQuery($pageID: String!) {
    slatePage(id: { eq: $pageID }) {
      name
      data
      slug
    }
  }
`

type Props = {
  data: PageQueryQuery
}

const PageTemplate = ({ data }: Props) => {
  const title = data.slatePage?.name
  const content = data.slatePage?.name
  return (
    <div>
      {title && <h1>{title}</h1>}
      {content && <div>{content}</div>}
    </div>
  )
}
export default PageTemplate
