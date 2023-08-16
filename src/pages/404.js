import React, { useEffect, useState } from "react";
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import Header from "../components/header"
import Aside from "../components/aside"
import Footer from "../components/footer"


const Error404 = () => {
  const { items, bannerimage, render: RenderHeader } = Header();
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state

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
                <h1 className="error404">Error 404</h1>
                <div className="error404">
                    <StaticImage id="errorimage" alt="Error 404, a stylized warrior looking at the camera" src="../images/404img.png" />
                </div>
                <p className="error404">No content found.
                </p>
                <Link className="homelink" to="/">
                    <StaticImage id="homebutton" alt="Home button" src="../images/home.png" />
                </Link>
            </article>
          </main>
          <Aside />
          <Footer />
        </div>
        )}
      </body>
    </html>
  )
}

export default Error404