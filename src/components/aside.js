import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

const Aside = () => {
  const data = useStaticQuery(graphql`
    query {
      wpgraphql {
        generalSettings {
          sidebarname
          asideentry1: asideentries(index: 0) {
            image
            text
            class
            link
          }
          asideentry2: asideentries(index: 1) {
            image
            text
            class
            link
          }
          asideentry3: asideentries(index: 2) {
            image
            text
            class
            link
          }
          asideentry4: asideentries(index: 3) {
            image
            text
            class
            link
          }
          asideentry5: asideentries(index: 4) {
            image
            text
            class
            link
          }
        }
      }
    }
  `);

  const {
    sidebarname,
    asideentry1,
    asideentry2,
    asideentry3,
    asideentry4,
    asideentry5,
  } = data.wpgraphql.generalSettings;

  const asideEntries = [
    asideentry1,
    asideentry2,
    asideentry3,
    asideentry4,
    asideentry5,
  ].filter((entry) => entry.image || entry.text);

  return (
    <aside className="sidebar">
      <h1>{sidebarname}</h1>
      <div className="aside-content">
        {asideEntries.map((entry, index) => (
          <a href={entry.link} key={index}>
            <p className={entry.class}>
              {entry.image && (
                <img
                  src={entry.image}
                  alt={entry.image.alt || 'Image'}
                />
              )}
              {entry.text && <span>{entry.text}</span>}
            </p>
          </a>
        ))}
      </div>
    </aside>
  );
};

export default Aside;