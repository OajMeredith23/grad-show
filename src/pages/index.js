import * as React from "react"
import { Link, graphql } from 'gatsby'
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import * as styles from './index.module.sass'
import _ from 'lodash'

const Designers = ({ data }) => {

  const designers = data.allMarkdownRemark.edges

  return (
    <section className={styles.container}>

      <figure className={styles.landing}>
        <h1><strong>DEGREE SHOW</strong></h1>
        <h1>GRAPHIC DESIGN &amp; UX/UI</h1>

        <h4>RAVENSBOURNE UNIVERSITY</h4>
      </figure>
      {
        designers.map(({ node }, i) => {

          const { title, projects } = node.frontmatter
          const img = projects && projects[0]?.images?.length > 0 && projects[0]?.images[0]?.src
          return projects && (
            <Link
              to={node.fields.slug}
              key={`${node.id}-${i}`}
              className={styles.designer}
            >
              <div className={styles.content}>
                <div className={styles.imageContainer}>
                  <GatsbyImage
                    key={`${node.id}`}
                    image={getImage(img)}
                    className={styles.image}
                  />
                </div>
                <h1>
                  <strong>
                    {title}
                  </strong>
                </h1>
              </div>
            </Link>
          )

        })}
    </section>
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
            projects {
              title
              images {
                src {
                  childImageSharp {
                    gatsbyImageData(
                width: 300
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
export default Designers
