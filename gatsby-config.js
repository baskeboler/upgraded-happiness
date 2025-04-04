module.exports = {
  siteMetadata: {
    title: `Los viajes de Rosario`,
    author: `Rosario`,
    description: `Memorias de mamá en sus viajes.`,
    siteUrl: `https://los-viajes-de-rosario.netlify.app`,
    social: {
      twitter: `baskeboler`,
    },
  },
  plugins: [
    `gatsby-plugin-netlify-cms`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          // {
          //   resolve: `gatsby-remark-images`,
          //   options: {
          //     maxWidth: 590,
          //   },
          // },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
   /* `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-140938272-1`,
      },
    },*/
    // `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [{
          serialize: ({
            query: {
              site,
              allMarkdownRemark
            }
          }) => {
            return allMarkdownRemark.edges.map(edge => {
              return Object.assign({}, edge.node.frontmatter, {
                description: edge.node.excerpt,
                date: edge.node.frontmatter.date,
                url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                custom_elements: [{
                  "content:encoded": edge.node.html
                }],
              })
            })
          },
          query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
          output: "/rss.xml",
          title: "Mamá en el Caribe RSS Feed",
        }, ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Los viajes de Rosario`,
        short_name: `Bibí Viajando`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/favicon.png`,

      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    // `gatsby-plugin-transition-link`,      {
    {    resolve: `gatsby-plugin-disqus`,
        options: {
            shortname: `los-viajes-de-rosario`
        }
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
  ],
}
