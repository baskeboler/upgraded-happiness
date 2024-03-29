import React from "react"
import { graphql, Link } from "gatsby"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import { Disqus } from 'gatsby-plugin-disqus';


class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const postPath = post.fields.slug;
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext
    const canonicalUrl = `${this.props.data.site.siteMetadata.siteUrl}${postPath}` ;
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <h2 
          // style={{
          //   ...scale(1.5),
          //   marginBottom: rhythm(1.5),
          //   marginTop: 0,
          // }}
          >{post.frontmatter.title}</h2>
        <p
          style={{
            ...scale(-1 / 5),
            display: `block`,
            marginBottom: rhythm(1),
            marginTop: rhythm(-1),
          }}
        >
          {post.frontmatter.date}
        </p>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />

        <Disqus
                config={{
                    /* Replace PAGE_URL with your post's canonical URL variable */
                    url: canonicalUrl,
                    /* Replace PAGE_IDENTIFIER with your page's unique identifier variable */
                    identifier: postPath,
                    /* Replace PAGE_TITLE with the title of the page */
                    title: post.frontmatter.title,
                }}
        />

        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <Bio />

        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
        siteUrl
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
      fields {
        slug
      }
    }
  }
`
