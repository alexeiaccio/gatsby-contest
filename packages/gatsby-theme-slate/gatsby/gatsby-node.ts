import * as fs from 'fs'

// Make sure the data directory exists
export const onPreBootstrap = ({ reporter }) => {
  const contentPath = 'data'

  if (!fs.existsSync(contentPath)) {
    reporter.info(`creating the ${contentPath} directory`)
    fs.mkdirSync(contentPath)
  }
}
// Define the "SlatePage" type
export const sourceNodes = ({ actions }) => {
  actions.createTypes(`
    type SlatePage implements Node @dontInfer {
      id: ID!
      name: String!
      data: String!
      slug: String!
    }
  `)
}
// Define resolvers for custom fields
export const createResolvers = ({ createResolvers }) => {
  const basePath = '/'
  // Quick-and-dirty helper to convert strings into URL-friendly slugs.
  const slugify = str => {
    const slug = str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')
    return `/${basePath}/${slug}`.replace(/\/\/+/g, '/')
  }
  createResolvers({
    SlatePage: {
      slug: {
        resolve: source => slugify(source.name),
      },
    },
  })
}
// query for pages and create pages
export const createPages = async ({ actions, graphql, reporter }) => {
  const basePath = '/admin'
  actions.createPage({
    path: basePath,
    component: require.resolve('./src/templates/admin.tsx'),
  })
  const result = await graphql(`
    query {
      allSlatePage {
        nodes {
          id
          slug
        }
      }
    }
  `)
  if (result.errors) {
    reporter.panic('error loading pages', result.errors)
    return
  }
  const pages = result.data.allSlatePage.nodes
  pages.forEach(page => {
    const slug = page.slug
    actions.createPage({
      path: slug,
      component: require.resolve('./src/templates/page.tsx'),
      context: {
        pageID: page.id,
      },
    })
  })
}
