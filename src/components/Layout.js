import React, { useState, useEffect } from "react"
import { Helmet } from 'react-helmet'
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

            {showBgAnimation &&
                <div className={styles.backgroundAnimation}>
                    <div>
                        {[0, 1, 2, 3].map((part, i) => <span style={{
                            transform: `rotate(${i === backgroundPartToMove && angles[Math.floor(Math.random() * angles.length - 1)]}deg)`,
                            background: randomColor
                        }}></span>)}
                    </div>
                </div>
            }

            <main
                className={styles.childrenContainer}
                key={location?.pathname}
            >
                {children}
            </main>



        </div>
    )
}

export default Layout