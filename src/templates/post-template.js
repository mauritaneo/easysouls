import React, { useState, useEffect, useRef } from "react";
import { graphql, Link } from "gatsby"
import { ThemeImage } from "../components/header"
import Header from "../components/header"
import Aside from "../components/aside"
import Footer from "../components/footer"
import { StaticImage } from "gatsby-plugin-image"

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
  const { items, render: RenderHeader } = Header()
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state
  

  const baseUrl = process.env.URL || '/';

  // Function to replace the image URLs in the post content
  const replaceImageUrls = (content) => {
    const bannerImagePath = '/images/banner.jpg';
    const regex = new RegExp(`http:\/\/localhost\/easysouls\/wp-content\/uploads\/\\d{4}\/\\d{2}\/(?!${bannerImagePath})`, 'g');
    return content.replace(regex, `${baseUrl}images/`);
  };

  const bannerimage = "/images/banner.jpg"

  useEffect(() => {
    // Set isLoading to false after component has mounted
    setIsLoading(false);
  }, []);

  return (
    <html lang="en">
      <RenderHeader />
      <body>
      {isLoading ? ( // Render loading spinner or message if isLoading is true
          <div>Loading...</div>
        ) : (
        <div className="site">
          <header className="banner">
            <Link to="/">
              <ThemeImage imageUrl={bannerimage} />
            </Link>
          </header>

          <nav className="menu">
            <ul id="primary-menu" className="menu-class">
              {items.map((item) => (
                <li key={item.id}>
                  <Link to={`${item.url}#index`}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <main id="index" className="content">
            <article>
              <h1 className="pagetitle" dangerouslySetInnerHTML={{ __html: post.title }} />
              <div dangerouslySetInnerHTML={{ __html: replaceImageUrls(post.content) }} />
            </article>
            <Link className="pagehomelink" to="/">
              <StaticImage id="homebutton" alt="Home button" src="../images/home.png" />
            </Link>
          </main>
          <Aside />
          <Footer />
        </div>
      )}
      </body>
    </html>
  )
}

export default PostTemplate
