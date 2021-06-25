import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Helmet } from 'react-helmet'

export default ({ data }) => {

  const post = data.markdownRemark
  const {
    title,
    introduction,
  } = post.frontmatter


  return (
    <>
      <Helmet title={title} defer={false}>
        <title>{title}</title>
        <meta name="description" content={introduction} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={title} />
        <meta property="og:type" content="website" />
      </Helmet>

      <h1>{title}</h1>
      <p>{introduction}</p>

    </ >
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        introduction
      }
    }
  }
  `