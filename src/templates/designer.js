import React, { useEffect, useState, useRef } from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image"
import { Helmet } from 'react-helmet'
import * as styles from './designer.module.sass'
import { links } from "min-document"

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

  console.log({ projects })


  useEffect(() => {
    console.log("W", contentContainer.current.offsetWidth)
    console.log("Height", contentContainer.current.offsetHeight);

    setProjDimensions({
      width: contentContainer.current.offsetWidth,
      height: contentContainer.current.offsetHeight
    })

    return () => { };

  }, [])

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
          <section className={styles.designerInfo}>

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
          </section>

          <section className={styles.projects} ref={contentContainer}>
            {projDimensions &&

              projects.map((project, i) => {
                console.log(project.images)
                console.log({ projDimensions })
                // if (i > 0) return
                return (

                  <figure
                    className={styles.project}
                    key={project.title}
                  >
                    <figcaption>
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                    </figcaption>
                    <div className={styles.projectImageContainer}>
                      {project.images.map(img => {
                        return (
                          <div className={styles.projectImage}></div>
                          // <GatsbyImage
                          //   className={styles.projectImage}
                          //   image={getImage(img.src)}
                          //   alt=""
                          // />
                        )
                      })}
                    </div>
                  </figure>
                )
              })

            }

          </section>


        </div>

      </main>

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
        links
        projects {
            title
            description
            video
            images {
              src {
                childImageSharp {
                    gatsbyImageData(
                      height: 800
                      placeholder: BLURRED
                      formats: [AUTO, WEBP, AVIF]
                    )
                    fluid {
                      ...GatsbyImageSharpFluid
                    }
                  }
              }
            }
          }
      }
    }
  }
  `
  //  {projDimensions &&
  //   (
  //     <>
  //       <h2>{JSON.stringify(projDimensions)}</h2>
  //       <figure className={styles.project}>

  //         <figcaption>
  //           <h3>"Title"</h3>
  //           <p>description</p>
  //         </figcaption>

  //         <div className={styles.projectImageContainer}>
  //           <img
  //             className={styles.projectImage}
  //             src={`http://placekitten.com/2200/2000`} alt=""
  //             height={projDimensions.height - 30}
  //           />
  //           {/* <img
  //             className={styles.projectImage}
  //             src={`http://placekitten.com/2200/2000`} alt=""
  //             height={projDimensions.height - 30}
  //           /> */}
  //         </div>
  //       </figure>
  //     </>
  //   )
  // }