import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { IndexQueryQuery, Maybe, SlatePage } from '../../graphql-types'
import List from '../components/list'
import PageCard from '../components/page-card'
const IndexTemplate = () => {
  const data = useStaticQuery(graphql`
    query IndexQuery {
      allSlatePage {
        nodes {
          id
          name
          slug
        }
      }
    }
  `) as IndexQueryQuery
  const pages = data.allSlatePage.nodes.map(
    (page: Maybe<Pick<SlatePage, 'name' | 'id' | 'slug'>>) => ({
      ...page,
      renderer: () => <PageCard page={page} />,
    })
  )

  return (
    <div>
      <List items={pages} />
    </div>
  )
}
export default IndexTemplate
