exports.onRouteUpdate = ({ location }) => {
    setTimeout(() => {
      scrollToAnchor(location);
    }, 1000); // wait for 1 second before scrolling
  }
  
  function scrollToAnchor(location, mainNavHeight = 0) {
    if (location && location.hash) {
      const item = document.querySelector(`${location.hash}`);
      if (item) {
        window.scrollTo({
          top: item.offsetTop - mainNavHeight,
          behavior: "smooth",
        });
      }
    }
  }