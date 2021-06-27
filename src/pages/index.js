import React, { useState, useEffect } from "react"
import { Link, graphql } from 'gatsby'
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import * as styles from './index.module.sass'
import _ from 'lodash'
import { styled } from "@material-ui/core"

const IndexPage = () => {


  const [backgroundPartToMove, setBackgroundPartToMove] = useState(null);
  const angles = [0, 90, 180, 270]

  useEffect(() => {
    const pickRandomBackgroundPartToMove = setInterval(() => {
      setBackgroundPartToMove(Math.round(Math.random() * 4))
    }, 1000);


    return () => clearInterval(pickRandomBackgroundPartToMove);
  }, [])
  return (
    <main className={styles.container}>

      <div className={styles.backgroundAnimation}>
        <div>
          {[0, 1, 2, 3].map((part, i) => <span style={{
            transform: `rotate(${i === backgroundPartToMove && angles[Math.floor(Math.random() * angles.length - 1)]}deg)`
          }}></span>)}
        </div>
      </div>

      <section className={styles.showInfo}>
        <hgroup>
          <h1><strong>Degree Show</strong></h1>
          <h1>GRAPHIC DESIGN &amp; UX/UI</h1>
          <h3>
            8th and 9th july 2021
          </h3>
          <h3>
            Holborn, London
          </h3>
        </hgroup>
      </section>

      <section className={styles.tickets}>
        <a href="" className={styles.ticketsBtn}>
          <h3>GET YOUR TICKETS</h3>
        </a>
        <figure className={styles.comingSoon}>
          <h3>
            <strong>
              COMING SOON
            </strong>
          </h3>
          <h3>
            RAVENSBOURNE UNIVERSITY
          </h3>
        </figure>
      </section>

    </main>
  )
}

export default IndexPage
