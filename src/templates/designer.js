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
    .replace('.net', '')
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


    <main className={styles.container}>
      <Helmet title={title} defer={false}>
        <title>{title}</title>
        <meta name="description" content={introduction} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={title} />
        <meta property="og:type" content="website" />
      </Helmet>
      <Lightbox image={lightboxImage} close={() => setLightboxImage(null)} />

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
          console.log(project.video)
          return (
            <>
              <div className={styles.projectInfo} id={_.snakeCase(project.title)}>
                <h3><strong>{project.title}</strong></h3>
                <p>{project.description}</p>
              </div>

              {project.video &&
                <Video
                  videoSrcURL={project.video}

                  videoTitle="Official Music Video on YouTube"
                />
                // <iframe
                //   src={project.video}
                //   title={project.title}
                //   frameBorder="0"
                //   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                //   webKitAllowFullScreen="true"
                //   mozAllowFullScreen="true"
                //   allowFullScreen
                // ></iframe>
              }

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
  )
}



const parseVideoURL = (url) => {

  let output = url;

  if (url.includes('youtube')) {
    console.log("Youtube")
    const regex = /watch\?v=/i;
    output = url.replace(regex, 'embed/');
  }

  if (url.includes('youtu.be')) {
    console.log("Youtu.be")
    const regex = /be\?v=/i;
    output = url.replace('.be', 'be.com/embed');
  }

  if (url.includes('vimeo')) {

    console.log("vimeo");
    if (!url.includes('player')) {
      output = [url.slice(0, url.indexOf('vimeo')), 'player.', url.slice(url.indexOf('vimeo'))].join(''); // add 'player. to url
      output = [output.slice(0, output.indexOf('.com') + 4), '/video', output.slice(output.indexOf('.com') + 4)].join('')
    }
  }

  return output
}

const Video = ({ videoSrcURL, videoTitle, ...props }) => {

  return (
    <div className={styles.projectVideo}>
      <iframe
        src={parseVideoURL(videoSrcURL)}
        title={videoTitle}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        frameBorder="0"
        webkitallowfullscreen="true"
        mozallowfullscreen="true"
        allowFullScreen
      />
    </div>
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
        course
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