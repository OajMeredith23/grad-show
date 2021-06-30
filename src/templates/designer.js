import React, { useEffect, useState, useRef } from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image"
import { Helmet } from 'react-helmet'
import * as styles from './designer.module.sass'
import { links } from "min-document"
import _ from 'lodash'
import FeatherIcon from 'feather-icons-react';

import Lightbox from '../components/Lightbox'

const detectWebsite = (url) => {
  // var url = "http://scratch99.com/web-development/javascript/";
  var domain = url
    .replace("http://", '')
    .replace("https://", '')
    .replace('www.', '')
    .replace('.com', '')
    .replace('.co.uk', '')
    .split(/[/?#]/)[0];
  return domain
}
export default function Posts({ data }) {

  const contentContainer = useRef(null)
  const [lightboxImage, setLightboxImage] = useState(null);
  const post = data.markdownRemark;

  const {
    title,
    introduction,
    links,
    course = 'Graphic Design',
    projects
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

      <Lightbox image={lightboxImage} close={() => setLightboxImage(null)} />
      <main className={styles.container}>


        <header>
          <div className={styles.icon}></div>
          <hgroup>
            <h1><strong>{title}</strong></h1>
            <h2>{course}</h2>
          </hgroup>
        </header>

        <div className={styles.content} ref={contentContainer}>

          <figure className={styles.designerInfo}>
            <p>
              {introduction}
            </p>

            {links &&
              <ul className={styles.links}>
                <li>
                  <h3><strong>Links</strong></h3>
                </li>
                {links.map(link =>
                  <a
                    key={link}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <li style={{
                      textTransform: 'capitalize',
                      textDecoration: 'underline'
                    }}>{detectWebsite(link)}</li>
                  </a>
                )}
              </ul>
            }
          </figure>

          {projects?.map(project => {
            return (
              <>
                <div className={styles.projectInfo} id={_.snakeCase(project.title)}>
                  <h3><strong>{project.title}</strong></h3>
                  <p>{project.description}</p>
                </div>

                {project.images?.map(image => {
                  return image.src && (
                    <>
                      <GatsbyImage
                        image={getImage(image.src)}
                        className={styles.projectImage}
                        onClick={() => setLightboxImage(image.src)}
                      />
                    </>
                  )
                })}
              </>
            )
          })}

          <aside
            className={styles.goBack}
            onClick={() => {
              contentContainer.current.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
              })
              console.log("hi")
            }}
          >
            <strong>
              Go back to bio and links
            </strong>
            <FeatherIcon icon="arrow-left" size="72" />
          </aside>
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
              }
            }
          }
      }
    }
  }
  `