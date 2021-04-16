/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import { StaticQuery, graphql } from "gatsby"
// import Image from "gatsby-image"
import { GatsbyImage as Image } from "gatsby-plugin-image";

import { rhythm } from "../utils/typography"

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author, social } = data.site.siteMetadata
        return (
          <div
            style={{
              display: `flex`,
              marginBottom: rhythm(2.5),
            }}
          >
            <Image
              // fixed={data.avatar.childImageSharp.fixed}
              image={data.avatar.childImageSharp.gatsbyImageData}
              alt={author}
              style={{
                marginRight: rhythm(1 / 2),
                marginBottom: 0,
                minWidth: 64,
                borderRadius: `100%`,
              }}
              imgStyle={{
                borderRadius: `50%`,
              }}
            />
            <p>
              Escrito por <strong>{author}</strong>, quien vive en Montevideo,
              Uruguay. El sitio fue creado por Victor.
              {` `}
              <a href={`https://twitter.com/${social.twitter}`}>
                Siguelo en Twitter
              </a>
            </p>
          </div>
        )
      }}
    />
  )
}

// fixed(width: 64, height: 64) {
//   ...GatsbyImageSharpFixed
const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        gatsbyImageData(layout: FIXED, width: 64, height: 64)
        
      }
    }
    site {
      siteMetadata {
        author
        social {
          twitter
        }
      }
    }
  }
`

export default Bio
