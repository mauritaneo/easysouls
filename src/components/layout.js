import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import "@wordpress/block-library/build-style/style.css"
import "../styles/layout.css"

const Layout = () => {
  const data = useStaticQuery(graphql`
  query {
    wpgraphql {
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

const { url } = data.wpgraphql.menu.menuItems.nodes // Forse va preso da generalSettings

// Loop through the menu items and make the links relative
const items = data.wpgraphql.menu.menuItems.nodes.map(item => ({
  ...item,
  url: item.url.replace(url, ""),
}))

  return (
    <>
      <header>
        {items.map(item => (
          <Link key={item.id} to={item.url}>
            {item.label}                  
          </Link>
        ))}
      </header>
    </>
  )
}

export default Layout