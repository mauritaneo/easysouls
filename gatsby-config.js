/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: "Easy Souls",
    siteUrl: 'https://easysouls.netlify.com/'
  },

  assetPrefix: '__GATSBY_RELATIVE_PATH__',

  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `src/pages/index.js`,
      },
    },

    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `src/images`,
        name: 'images',
      },
    },

    'gatsby-plugin-sitemap',

    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        src: `src`,
      },
    },

    {
      resolve: 'gatsby-transformer-remark',
    },

    {
      resolve: 'gatsby-remark-relative-images-v2',
    },
  
  
    "gatsby-plugin-gatsby-cloud",

    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },

    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'WPGraphQL',
        fieldName: 'wpgraphql',
        url: 'https://05d7-82-61-220-104.ngrok-free.app/easysouls/graphql',
      },
    },
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        // ...
      },
    },
    {
      resolve: `gatsby-transformer-sharp`,
      options: {
        // ...
      },
    },
    {
      resolve: `gatsby-plugin-image`,
      options: {
        // ...
      },
    },
  ],
}