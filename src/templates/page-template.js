import React, { useState, useEffect } from "react";
import { graphql, Link } from "gatsby"
import Header from "../components/header"
import Aside from "../components/aside"
import Footer from "../components/footer"
import { StaticImage } from "gatsby-plugin-image"
import EasyNews from "../components/easy-news"


export const query = graphql`
  query($id: ID!) {
    wpgraphql {
      page(id: $id) {
        title
        content
      }
    }
  }

`

const PageTemplate = ({ data }) => {
  const page = data.wpgraphql.page
  const { items, bannerimage, render: RenderHeader } = Header();
  const hasEasyNews = /<div id="root">|<EasyNews \/>/.test(page.content);
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state

  const baseUrl = process.env.URL || '';

  // Function to replace the image URLs in the pages content
  const replaceImageUrls = (content) => {
    const regex = /http:\/\/localhost\/easysouls\/wp-content\/uploads\/\d{4}\/\d{2}\//g
    return content.replace(regex, `${baseUrl}/images/`)
  }

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
              <img src={bannerimage} alt="Easy Soul's banner: a mysterious warrior with an helm" />
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
              <h1 className="pagetitle" dangerouslySetInnerHTML={{ __html: page.title }} />
              {page.content && (
                <div dangerouslySetInnerHTML={{ __html: replaceImageUrls(page.content) }} />
              )}
              <EasyNews show={hasEasyNews} />
            </article>
            <Link className="pagehomelink" to="/">
              <StaticImage alt="Home button" src="../images/home.png" />
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

export default PageTemplate