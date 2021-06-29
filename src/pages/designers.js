import * as React from "react"
import { Link, graphql } from 'gatsby'
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import * as styles from './designers.module.sass'
import _ from 'lodash'

const IndexPage = ({ data }) => {

  const designers = data.allMarkdownRemark.edges

  return (
    <main className={styles.container}>

      <figure className={`${styles.siteIntro} ${styles.info}`} >
        <hgroup>
          <h1>Rave Graphics / UX-UI 2021</h1>
        </hgroup>
      </figure>

      <figure className={`${styles.showInfo} ${styles.info}`}>
        <hgroup>
          <h1>Rave Graphics / UX-UI 2021</h1>
        </hgroup>
      </figure>

      {designers.map(({ node }, i) => {

        const imgs = node.frontmatter.projects?.map(proj => { return { image: proj.images[0].src, title: proj.title } }).flat();

        return (

          imgs?.map(({ title, image }, i) => {
            return (
              <Link
                to={`${node.fields.slug.slice(0, -1)}#${_.snakeCase(title)}`} // Remove trailing slash and convert project title to snake case for URL anchor
                key={node.id}
              >
                <GatsbyImage
                  key={`${node.id}-${i}`}
                  className={styles.image}
                  image={getImage(image)}
                />
              </Link>
            )
          })

        )
      })}
    </main>
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
            projects {
              title
              images {
                src {
                  childImageSharp {
                    gatsbyImageData(
                      width: 400
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
