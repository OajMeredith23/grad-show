import * as React from 'react'
import { graphql, Link } from "gatsby"
import { CopyToClipboard } from 'react-copy-to-clipboard';

const DesignerURLs = ({ data }) => {

    const urls = data.allMarkdownRemark.edges
    console.log(urls)
    return (
        <ul>
            <h1>
                total pages: {urls.length}
            </h1>
            {urls.map(({ node }, i) => {

                return (
                    <li
                        key={i}
                        style={{ marginBottom: '1em', paddingLeft: '1em' }}
                    >
                        <CopyToClipboard text={`https://uxgra-degreeshow.com${node.fields.slug}`}>
                            <>
                                <h4>{node.frontmatter.title}</h4>
                                <p>
                                    https://uxgra-degreeshow.com{node.fields.slug}
                                </p>
                            </>
                        </CopyToClipboard>
                    </li>
                )
            })}
        </ul>
    );

}


export const query = graphql`
  query {
    allMarkdownRemark {
    edges {
      node {
        fields {
          slug 
        }
        frontmatter{
            title 
        }
      }
    }
  }
  }
  `

export default DesignerURLs