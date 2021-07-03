import React from "react"
import { Link, graphql } from 'gatsby'
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import * as styles from './index.module.sass'
import { styled } from "@material-ui/core"
import Div100vh from 'react-div-100vh';
const colors = ['#ffabcd', '#CCE247', '#FE3D2B'];

const IndexPage = () => {


  // const [backgroundPartToMove, setBackgroundPartToMove] = useState(null);
  // const [randomColor, setRandomColor] = useState(null)
  // const angles = [0, 90, 180, 270]

  // useEffect(() => {

  //   setRandomColor(colors[Math.round(Math.random() * colors.length - 1)]);

  //   const pickRandomBackgroundPartToMove = setInterval(() => {
  //     setBackgroundPartToMove(Math.round(Math.random() * 4))
  //   }, 500);

  //   return () => clearInterval(pickRandomBackgroundPartToMove);
  // }, []);

  return (
    <Div100vh
      className={styles.container}
    >

      {/* <div className={styles.backgroundAnimation}>
        <div>
          {[0, 1, 2, 3].map((part, i) => <span style={{
            transform: `rotate(${i === backgroundPartToMove && angles[Math.floor(Math.random() * angles.length - 1)]}deg)`,
            background: randomColor
          }}></span>)}
        </div>
      </div> */}

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
