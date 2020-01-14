module.exports = {
  plugins: [
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
};
