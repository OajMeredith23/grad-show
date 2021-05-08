import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Helmet } from 'react-helmet'
import styled from 'styled-components';
import Landing from '../components/Landing'

export default ({ data }) => {

  const post = data.markdownRemark
  const { title, description, thumbnail, video } = post.frontmatter
  console.log({ video })
  const image = getImage(thumbnail)

  return (
    <>
      <Helmet title={title} defer={false}>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={title} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={thumbnail.publicURL} />
      </Helmet>

      <Landing
        title={title}
        description={description}
      ></Landing>
      <Container>
        <div className="cover-image">
          <GatsbyImage image={image} alt={title} />
        </div>
        {video &&
          <div className="video">
            <video width="320" height="240" controls>
              <source src={video.publicURL} type="video/mp4" />
            </video>
          </div>
        }
        <div dangerouslySetInnerHTML={{ __html: post.html }}></div>
      </Container>
    </ >
  )
}

const Container = styled.div`
  .cover-image .gatsby-image-wrapper {
    width: 100%;
    height: 100%;
    picture, img {
      object-fit: contain;
    }
  }
`
export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        description
        thumbnail{
            childImageSharp {
                gatsbyImageData(
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
                )
            }
                publicURL
        }
        video{
          publicURL
        }
      }
    }
  }
  `