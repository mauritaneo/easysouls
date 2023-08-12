import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import parse from 'html-react-parser';

const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      wpgraphql {
        footerWidget
        generalSettings {
          url
        }
      }
    }
  `);

  const { url } = data.wpgraphql.generalSettings;

  const footerWidgetHtml = data.wpgraphql.footerWidget.replace(new RegExp(`${url}(\\/[^"]*)?`, 'g'), `$1#index`);

  return (
    <footer className="footer">
      <div className="footer-widgets">{parse(footerWidgetHtml)}</div>
    </footer>
  );
};

export default Footer;