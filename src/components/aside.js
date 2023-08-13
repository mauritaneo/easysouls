import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

const Aside = () => {
  const data = useStaticQuery(graphql`
    query {
      wpgraphql {
        generalSettings {
          sidebarname
          asideentry1: asideentries(index: 0) {
            text
            class
            link
          }
          asideentry2: asideentries(index: 1) {
            text
            class
            link
          }
          asideentry3: asideentries(index: 2) {
            text
            class
            link
          }
          asideentry4: asideentries(index: 3) {
            text
            class
            link
          }
          asideentry5: asideentries(index: 4) {
            text
            class
            link
          }
          asideEntryImageData1: asideEntryImageData(index: 0)
          asideEntryImageData2: asideEntryImageData(index: 1)
          asideEntryImageData3: asideEntryImageData(index: 2)
          asideEntryImageData4: asideEntryImageData(index: 3)
          asideEntryImageData5: asideEntryImageData(index: 4)
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
    asideEntryImageData1,
    asideEntryImageData2,
    asideEntryImageData3,
    asideEntryImageData4,
    asideEntryImageData5,
  } = data.wpgraphql.generalSettings;

  const asideEntries = [
    { ...asideentry1, image: asideEntryImageData1 },
    { ...asideentry2, image: asideEntryImageData2 },
    { ...asideentry3, image: asideEntryImageData3 },
    { ...asideentry4, image: asideEntryImageData4 },
    { ...asideentry5, image: asideEntryImageData5 },
  ].filter((entry) => entry.image || entry.text);

  // Get the base URL of the site
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

  return (
    <aside className="sidebar">
      <h1>{sidebarname}</h1>
      <div className="aside-content">
        {asideEntries.map((entry, index) => (
          <a href={entry.link} key={index}>
            <p className={entry.class}>
              {entry.image && (
                <img
                  src={baseUrl + '/' + entry.image}
                  alt=""
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