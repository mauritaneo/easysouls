import React, { useEffect } from 'react';

const EasyNews = ({ show }) => {
    useEffect(() => {
      if (show) {
        const script = document.createElement('script');
        script.src = 'https://easy-news-pdyt1ko1r-mauritaneo.vercel.app/bundle.js';
        script.async = true;
        document.head.appendChild(script);
      }
    }, [show]);
  
    return show ? <div id="root"></div> : null;
  };

export default EasyNews;