import React, { useState, useEffect } from "react"
import { Helmet } from 'react-helmet'
import favicon from '../images/icon.png'


const title = "Oliver Meredith | Front-end developer & user-experience designer"
const description = "A front-end developer that builds upon a foundation in design. Creator of interesting, exciting digital experiences that build upon an education in UI/UX Design and 5 years experience using a variety of different web technologies."

const Layout = ({ children, location }) => {

    return (
        <div>

            <Helmet title={title} defer={false}>
                <meta name="description" content={description} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:type" content="website" />
                <link rel="icon" href={favicon} />
            </Helmet>


            <div>

                <main
                    key={location?.pathname}
                >
                    {children}
                </main>


            </div>

        </div>
    )
}

export default Layout