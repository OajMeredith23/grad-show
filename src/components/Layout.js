import React, { useState, useEffect } from "react"
import { Helmet } from 'react-helmet'
import favicon from '../images/icon.png'


const title = "Graphic Design/UX-UI Ravensbourne Degree Show"
const description = ""

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