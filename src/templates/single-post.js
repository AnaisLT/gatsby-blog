import React from "react"
import Layout from "../components/layout"
import { graphql, Link } from "gatsby"
import SEO from "../components/seo"
import { Badge, Card, CardBody, CardSubtitle } from "reactstrap"
import Image from "gatsby-image"
import { slugify } from "../util/utilityFunction"

const SinglePost = ({ data }) => {
    const post = data.markdownRemark.frontmatter
    return (
        <Layout pageTitle={post.title}>
            <SEO title={post.title}/>
                    <Card>
                        <Image className="card-image-top" fluid={post.image.childImageSharp.fluid} />
                        <CardBody>
                            <CardSubtitle>
                                <span className="text-info">{post.date}</span>by {' '}
                                <span className="text-info">{post.author}</span>
                            </CardSubtitle>
                            <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
                            <ul className="post-tags">
                                {post.tags.map(tag => (
                                    <li key={tag}>
                                        <Link to={`/tag/${slugify(tag)}`}></Link>
                                        <Badge color="primary">{tag}</Badge>
                                    </li>
                                ))}
                            </ul>
                        </CardBody>
                    </Card>
        </Layout>
    )
}

export const postQuery = graphql`
    query blogPostBySlug($slug: String!){
        markdownRemark(fields: { slug: { eq: $slug } }){
            id
            html
            frontmatter{
                title
                author
                date(formatString: "Do MM YYYY")
                tags
                image{
                    childImageSharp{
                        fluid(maxWidth: 700){
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
        }
    }
`

export default SinglePost