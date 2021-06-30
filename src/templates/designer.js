import React, { useEffect, useState, useRef } from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image"
import { Helmet } from 'react-helmet'
import * as styles from './designer.module.sass'
import { links } from "min-document"
import _ from 'lodash'

export default function Posts({ data }) {

  const contentContainer = useRef(null);
  const [projDimensions, setProjDimensions] = useState(null);
  const post = data.markdownRemark;

  const {
    title,
    introduction,
    links,
    course = 'Graphic Design',
    projects
  } = post.frontmatter

  console.log(projects.flat())


  const sizes = [400, 500, 600, 700];

  const randomSize = () => sizes[Math.round(Math.random() * sizes.length - 1)];


  return (
    <>
      <Helmet title={title} defer={false}>
        <title>{title}</title>
        <meta name="description" content={introduction} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={title} />
        <meta property="og:type" content="website" />
      </Helmet>

      <main className={styles.container}>


        <header>
          <div className={styles.icon}></div>
          <hgroup>
            <h1><strong>{title}</strong></h1>
            <h2>{course}</h2>
          </hgroup>
        </header>

        <div className={styles.content}>

          <figure className={styles.designerInfo}>
            <p>
              {introduction}
            </p>

            {links &&
              <ul>
                <li>
                  <h4><strong>Links</strong></h4>
                </li>
                {links.map(link =>
                  <a
                    key={link}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <li>{link}</li>
                  </a>
                )}
              </ul>
            }
          </figure>

          {projects.map(project => {
            return (
              <>

                <div className={styles.projectInfo} id={_.snakeCase(project.title)}>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>

                {project.images?.map(image => {
                  console.log(image.src.relativePath)
                  return (
                    <GatsbyImage image={getImage(image.src)} className={styles.projectImage} />
                  )
                })}
              </>
            )
          })}
        </div>
      </main>
    </>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        introduction
        links
        projects {
            title
            description
            video
            images {
              src {
                childImageSharp {
                    gatsbyImageData(
                      width: 1200
                      placeholder: BLURRED
                      formats: [AUTO, WEBP, AVIF]
                    )
                  }
                  relativePath
                  absolutePath
              }
            }
          }
      }
    }
  }
  `