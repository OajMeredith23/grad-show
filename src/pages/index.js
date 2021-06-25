import * as React from "react"
import { Link, graphql } from 'gatsby'
import { GatsbyImage, getImage } from "gatsby-plugin-image"


const IndexPage = ({ data }) => {

  const designers = data.allMarkdownRemark.edges

  return (
    <>
      {designers.map(({ node }, i) => {
        const { title, introduction, projects } = node.frontmatter;
        console.log({ node })
        return (

          <div key={node.id}>
            <h1>
              {title}
            </h1>
            <p>
              {introduction}
            </p>

            <div className="projects">

              {projects.map(project => {

                return (
                  <div key={`${project.title}-${project.description}`}>
                    <h2>{project.title}</h2>
                    <p>{project.description}</p>
                    <div className="images">
                      {project.images.map(image => {
                        const src = getImage(image.src)
                        return (
                          <GatsbyImage image={src} />
                        )
                      })}
                    </div>
                  </div>

                )
              })}

            </div>
            <hr />
          </div>
        )
      })}
    </>
  )
}

export const query = graphql`
  query{
    allMarkdownRemark {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            links
            introduction
            projects {
              description
              title
              images {
                src {
                  childImageSharp {
                    gatsbyImageData(
                      width: 200
                      placeholder: BLURRED
                      formats: [AUTO, WEBP, AVIF]
                    )
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
export default IndexPage
