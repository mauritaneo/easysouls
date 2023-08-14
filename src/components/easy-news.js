import React from 'react';
import '../static/bundle.js';

const EasyNews = ({ show }) => {
  return show ? <div id="root"></div> : null;
};

export default EasyNews;