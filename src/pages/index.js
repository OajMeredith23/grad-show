import React from "react"
import { Link, graphql } from 'gatsby'
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import * as styles from './index.module.sass'
import { styled } from "@material-ui/core"
import Div100vh from 'react-div-100vh';
const colors = ['#ffabcd', '#CCE247', '#FE3D2B'];

const IndexPage = () => {



  return (
    <Div100vh
      className={styles.container}
    >

      <section className={styles.showInfo}>
        <hgroup>
          <h1><strong>DEGREE SHOW</strong></h1>
          <h1>GRAPHIC DESIGN &amp; UX/UI</h1>
          <h3>
            8th and 9th July 2021
          </h3>
          <h3>
            Holborn, London
          </h3>
        </hgroup>
      </section>


      <section className={styles.tickets}>

        <a href="https://www.ravensbourne.ac.uk/connect/events/graphic-design-uxui-degree-show" className={styles.ticketsBtn}>
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

    </Div100vh>
  )
}

export default IndexPage
