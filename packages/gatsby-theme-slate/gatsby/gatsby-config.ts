export default {
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-graphql-codegen`,
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: 'data',
      },
    },
    {
      resolve: 'gatsby-transformer-json',
      options: {
        typeName: 'SlatePage',
      },
    },
  ],
}
