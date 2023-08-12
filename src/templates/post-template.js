import React from "react"
import { graphql, Link } from "gatsby"
import Header from "../components/header"
import Aside from "../components/aside"
import Footer from "../components/footer"


export const query = graphql`
  query($id: ID!) {
    wpgraphql {
      post(id: $id) {
        title
        content
      }
    }
  }

`

const PostTemplate = ({ data }) => {
  const post = data.wpgraphql.post
  const { items, bannerimage, render: RenderHeader } = Header();

  return (
    <html lang="en">
      <RenderHeader />
      <body>
        <div className="site">
          <header className="banner">
            <Link to="/">
              <img src={bannerimage} alt="" />
            </Link>
          </header>

          <nav className="menu">
            <ul id="primary-menu" className="menu-class">
              {items.map((item) => (
                <li key={item.id}>
                  <Link to={`${item.url}`}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          
          <main id="index" className="content">
            <article>
              <h1 className= "pagetitle" dangerouslySetInnerHTML={{ __html: post.title }} />
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>
          </main>
          <Aside />
          <Footer />
        </div>
      </body>
    </html>
  )
}

export default PostTemplate