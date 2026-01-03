import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    //Force the main browser window to scroll up
    window.scrollTo(0, 0);

    //Force the App Container to scroll up
    const appContainer = document.querySelector('.app-container');
    if (appContainer) {
      appContainer.scrollTo(0, 0);
    }

    //Force the body to scroll up
    document.body.scrollTo(0, 0);
    document.documentElement.scrollTo(0, 0);

  }, [pathname]);

  return null;
}

export default ScrollToTop;