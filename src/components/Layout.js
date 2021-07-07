import React, { useState, useEffect } from "react"
import { Helmet } from 'react-helmet'
import { Link } from 'gatsby'
import favicon from '../images/icon.png'
import * as styles from './layout.module.sass'


const title = "Graphic Design/UX-UI Ravensbourne Degree Show"
const description = ""

const colors = ['#ffabcd', '#CCE247', '#FE3D2B'];


const Layout = ({ children, showBgAnimation = true }) => {

    const [backgroundPartToMove, setBackgroundPartToMove] = useState(null);
    const [randomColor, setRandomColor] = useState(null)
    const angles = [0, 90, 180, 270]

    useEffect(() => {

        setRandomColor(colors[Math.round(Math.random() * colors.length - 1)]);

        const pickRandomBackgroundPartToMove = setInterval(() => {
            setBackgroundPartToMove(Math.round(Math.random() * 4))
        }, 500);


        return () => clearInterval(pickRandomBackgroundPartToMove);
    }, []);

    return (
        <div>

            <Helmet title={title} defer={false}>
                <meta name="description" content={description} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:type" content="website" />
                <link rel="icon" href={favicon} />
            </Helmet>

            <Nav />

            {showBgAnimation &&
                <div className={styles.backgroundAnimation}>
                    <div>
                        {[0, 1, 2, 3].map((part, i) => <span style={{
                            transform: `rotate(${i === backgroundPartToMove && angles[backgroundPartToMove]}deg)`,
                            background: randomColor
                        }}></span>)}
                    </div>
                </div>
            }

            <main
                className={styles.childrenContainer}
            >
                {children}
            </main>



        </div>
    )
}


const Nav = () => {

    return (
        <nav>
            <Link to="/">
                <h1>
                    <strong>
                        UXGRA
                    </strong>
                </h1>
            </Link>
            <ul>
                <li>
                    <Link to="/about">
                        <h2>
                            <strong>
                                Info
                            </strong>
                        </h2>
                    </Link>
                </li>
                <li>
                    <a href="https://www.ravensbourne.ac.uk/connect/events/graphic-design-uxui-degree-show">
                        <h2>
                            <strong>
                                Get your tickets
                            </strong>
                        </h2>
                    </a>
                </li>
            </ul>
        </nav>
    )
}
export default Layout