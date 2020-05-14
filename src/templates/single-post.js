import React from "react"
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa"
import Layout from "../components/layout"
import { graphql, Link } from "gatsby"
import SEO from "../components/seo"
import { Badge, Card, CardBody, CardSubtitle } from "reactstrap"
import Image from "gatsby-image"
import { slugify } from "../util/utilityFunction"
import authors from "../util/authors"
import { DiscussionEmbed } from "disqus-react"

const SinglePost = ({ data, pageContext }) => {
    const post = data.markdownRemark.frontmatter
    const author = authors.find(x => x.name === post.author)
    const baseUrl = 'https://urban-rewilding.netlify.app/'

    const disqusShortName = "urban-rewilding"
    const disqusConfig = {
        identifier: data.markdownRemark.id,
        title: post.title,
        url: baseUrl + pageContext.slug
    }

    return (
        <Layout pageTitle={post.title} postAuthor={author} authorImageFluid={data.file.childImageSharp.fluid}>
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
            <h3 className="text-center">
                Share this post
            </h3>
            <div className="text-center social-share-links">
                <ul>
                    <li>
                      <a 
                        href={"http://www.facebook.com/sharer/sharer.php?u-" + baseUrl + pageContext.slug} 
                        className="facebook"
                        target="_blank"
                        rel="noopener noreferrer">
                            <p className="fab fa-facebook-f fa-lg"><FaFacebookF /></p>
                      </a>  
                    </li>
                    <li>
                      <a 
                        href={"http://www.linkedin.com/shareArticle?url-" + baseUrl + pageContext.slug} 
                        className="linkedin"
                        target="_blank"
                        rel="noopener noreferrer">
                            <p className="fab fa-linkedin fa-lg"><FaLinkedinIn /></p>
                      </a>  
                    </li>
                </ul>
            </div>
            <DiscussionEmbed shortname={disqusShortName} config={disqusConfig} />
        </Layout>
    )
}

export const postQuery = graphql`
    query blogPostBySlug($slug: String!, $imageUrl: String!){
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
        file(relativePath: { eq: $imageUrl}){
            childImageSharp{
                fluid(maxWidth: 300){
                    ...GatsbyImageSharpFluid
                }
            }
        }
    }
`

export default SinglePost