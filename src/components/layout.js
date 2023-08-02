import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import "@wordpress/block-library/build-style/style.css"
import "../styles/layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
  query {
    wpgraphql {
      generalSettings {
        title
        url
      }
      
      menu(id: "dGVybToz") {
        menuItems {
          nodes {
            id
            label
            url
          }
        }
      }
    }
  }
`)

const { title, url } = data.wpgraphql.generalSettings

// Loop through the menu items and make the links relative
const items = data.wpgraphql.menu.menuItems.nodes.map(item => ({
  ...item,
  url: item.url.replace(url, ""),
}))

  return (
    <>
      <header>
        <Link to="/" className="home">
          {title}
        </Link>
        {items.map(item => (
          <Link key={item.id} to={item.url}>
            {item.label}                  
          </Link>
        ))}
      </header>
      <main>{children}</main>
    </>
  )
}

export default Layout