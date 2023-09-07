/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  pathPrefix: '/',
  siteMetadata: {
    title: "Easy Souls",
    siteUrl: 'https://easysouls.netlify.app/'
  },

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
        path: `static/images/`,
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
        url: 'https://cf22-79-51-127-55.ngrok-free.app/easysouls/graphql',
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