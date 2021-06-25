import * as React from "react"
import { graphql, useStaticQuery, Link } from 'gatsby';
import { StaticImage } from "gatsby-plugin-image"
import { SocialIcon } from 'react-social-icons'

export default function WorkList() {

    const data = useStaticQuery(
        graphql`
   
       query{
           allMarkdownRemark(
                sort: {fields: [frontmatter___order], order: ASC}
               filter: {
                   frontmatter: 
                   {category: {eq: "work"}
                   }
                   }
               ) {
               edges {
                   node {
                       id
                       frontmatter {
                       links
                       description
                       title
                       color
                       thumbnail{
                           publicURL
                       }
                       
                       }
                       fields{
                           slug
                       }
                   }
               }
           }
           }
   
   `
    )

    const posts = data.allMarkdownRemark.edges;

    return (
        <div id="work">
            {posts.map(({ node }, i) => {
                const { title, description, fields, thumbnail, links, color } = node.frontmatter
                const { slug } = node.fields
                return (
                    <div key={node.id}>
                        <div className="text">
                            <div className="title">
                                <Link to={slug}>
                                </Link>
                            </div>
                            <p dangerouslySetInnerHTML={{ __html: description }}></p>
                        </div>
                        <Link to={slug} key={slug}>
                            <div className="image">
                                <img src={`${thumbnail.publicURL}`} />
                            </div>
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}


