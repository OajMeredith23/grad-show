import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Helmet } from 'react-helmet'

export default ({ data }) => {

  const post = data.markdownRemark
  const {
    title,
    description,
    brief,
    solution,
    thumbnail,
    videoSrcURL,
    color,
    links
  } = post.frontmatter

  const image = getImage(thumbnail)

  return (
    <>
      <Helmet title={title} defer={false}>
        <title>Oliver Meredith | {title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={title} />
        <meta property="og:type" content="website" />
        {/* <meta property="og:image" content={thumbnail.publicURL} /> */}
      </Helmet>


      <div>
        <div className="cover-image">
          <GatsbyImage image={image} alt={title} />
        </div>

        {(brief || solution) &&
          <figure className="brief-and-solution">
            {brief &&
              <div className="text-section brief">
                <h1>Brief</h1>
                <p dangerouslySetInnerHTML={{ __html: brief }}></p>
              </div>
            }
            {solution &&
              <div className="text-section solution">
                <h1>Solution</h1>
                <p dangerouslySetInnerHTML={{ __html: solution }}></p>
              </div>
            }
          </figure>
        }

        <div dangerouslySetInnerHTML={{ __html: post.html }}></div>
      </div>
    </ >
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        description
        color
        links
        brief
        solution
        thumbnail{
            childImageSharp {
                gatsbyImageData(
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
                )
            }
                publicURL
        }
        videoSrcURL
      }
    }
  }
  `