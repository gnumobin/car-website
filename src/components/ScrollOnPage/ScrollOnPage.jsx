import { useEffect } from "react";
// import { withRouter } from 'react-router';
import "./ScrollOnPage.scss";

function ScrollOnPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

//   return null;
}

export default ScrollOnPage;
