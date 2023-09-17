import React from 'react';
import { useStaticQuery, graphql } from "gatsby"
import "@wordpress/block-library/build-style/style.css"
import "../styles/reset.css"
import "../styles/style.css"

export const ThemeImage = ({ imageUrl }) => {
  const imageUrlRelative = imageUrl.replace('/images/', `${process.env.PUBLIC_URL}/images/`)
  return <img className="banner" src={imageUrlRelative} alt="Easy Soul's banner: a mysterious warrior with an helm" />
}

function Header() {

  const data = useStaticQuery(graphql`
    query {
      wpgraphql {
        generalSettings {
            title
            description
            url
            choices
            bannerimage
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

  const { title, description, url, bannerimage } = data.wpgraphql.generalSettings
  // Loop through the menu items and make the links relative
  const items = data.wpgraphql.menu.menuItems.nodes.map(item => ({
    ...item,
    url: item.url.replace(url, ""),
  }))

  const sidebarPosition = data.wpgraphql.generalSettings.choices;
  const sidebarArea = sidebarPosition === 'left' ? 'sidebar content' : 'content sidebar';
  const sidebarDisplay = sidebarPosition !== 'none' ? 'block' : 'none';
  const gridTemplateColumns = sidebarPosition === 'left' ? '1fr 4fr' : '4fr 1fr';
  const mainGradient = sidebarPosition === 'left' ? 'left' : 'right';
  const asideGradient = sidebarPosition === 'left' ? 'right' : 'left';
  
  return {
    items,
    bannerimage,
    render: () => (
    <>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title} - {description}</title>
        <style>
          {`
            div.site {
              display: grid;
              grid-template-columns: ${gridTemplateColumns};
              grid-template-rows: auto auto auto;
              grid-template-areas:
                "banner banner"
                "menu menu"
                "${sidebarArea}"
                "footer footer";
              gap: 0.25% 1%;
              margin: 0 1% auto 1%;
            }

            .sidebar {
              grid-area: sidebar;
              padding: 2em;
              display: ${sidebarDisplay};
            }

            nav ul {
              list-style-type: none;
              text-align: center;
              background: linear-gradient(to ${mainGradient}, #0F1F26, #70483B);
            }

            main {
              background: linear-gradient(to ${mainGradient}, rgba(15, 31, 38, .8), rgba(112, 72, 59, .8)), 
                          linear-gradient(to bottom, rgba(112, 72, 59, .8), rgba(61, 216, 233, .8));
              padding: 2em;
            }

            main article a {
              font-size: calc(16px + .5vw);
              text-transform: lowercase;
            }

            div.iframe-container {
              display: block;
              position: relative;
              width: 100%;
              padding-bottom: 56.25%;
            }

            @media screen and (min-width: 1027px) {
              div.iframe-container {
                width: 80%;
              }
            }

            iframe {
              position: absolute;
              top: 0; 
              left: 0;
              width: 100%;
              height: 100%;
            }

            aside {
              background: linear-gradient(to ${asideGradient}, rgba(15, 31, 38, .8) 0%, rgba(112, 72, 59, .8)), 
                          linear-gradient(to bottom, rgba(112, 72, 59, .8), rgba(61, 216, 233, .8));
            }

            @media screen and (max-width: 728px) {
              .sidebar {
                padding: 0.5em;
              }

              div.site {
                display: grid;
                grid-template-columns: 4fr 1fr;
                grid-template-rows: auto auto auto auto auto;
                grid-template-areas:
                  "banner banner"
                  "menu menu"
                  "sidebar sidebar"
                  "content content"
                  "footer footer";
                gap: 0.25% 1%;
                margin: 0 1% auto 1%;
              }

              nav ul a {
                font-size: calc(16px + 2.3vw);
              }

              main article {
                padding: 0;
              }

              h1 {
                font-size: calc(2em + .5vw);
              }

              :is(h1, h2, h3, h4, h5, h6) {
                margin: 12px auto;
              }

              :root {
                --h1-font-size: calc(2em + .5vw);
                --h2-font-size: calc(var(--h1-font-size) * 0.8);
                --h3-font-size: calc(var(--h1-font-size) * 0.6);
                --h4-font-size: calc(var(--h1-font-size) * 0.5);
                --h5-font-size: calc(var(--h1-font-size) * 0.4);
                --h6-font-size: calc(var(--h1-font-size) * 0.3);
              }

              h1.pagetitle {
                font-size: calc(2em + .5vw);
              }

              h1.error404 {
                font-size: calc(2em + .5vw);
              }

              main article p {
                font-size: calc(16px + .5vw);
              }

              figure {
                display: flex;
                justify-content: center;
                width: 100%;
                height: auto;
              }

              body .is-layout-flex {
                display: block;
              }

              aside h1 {
                font-size: calc(1.5em + 2.5vw);
              }

              aside {
                background: linear-gradient(to ${mainGradient}, rgba(15, 31, 38, .8) 0%, rgba(112, 72, 59, .8)), 
                            linear-gradient(to bottom, rgba(112, 72, 59, .8), rgba(61, 216, 233, .8));
              }

              aside div.aside-content {
                display: -webkit-box;
                display: flex;
                flex-wrap: wrap;
                flex-direction: row;
                text-align: center;
                justify-content: center;
                margin-top: 0.3em;
              }

              aside div.aside-content a p {
                margin: 0.7em 1.5em;
              }

              aside div.aside-content a p img {
                height: 2.3em;
                width: auto;
              }

              aside div.aside-content a p span {
                font-size: calc(16px + 1.5vw);
              }

              a.more-link {
                margin-bottom: 2em;
              }

              a.more-link span {
                font-size: calc(1.2em + 1.5vw);
              }

              a.page-numbers {
                margin: 0 0.2em;
              }
            }
          `}
        </style>
      </head>
    </>
    ),
  };
}

export default Header;