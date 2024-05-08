import Router from 'next/router';
import { useEffect, useState } from 'react';
let timeout: NodeJS.Timeout;

export const usePageLoading = () => {
  const [isPageLoading, setIsPageLoading] = useState(false);

  useEffect(() => {
    const routeEventStart = () => {
      setIsPageLoading(true);
      timeout = setTimeout(() => {
        //noop
      }, 2000);
    };
    const routeEventEnd = () => {
      if (!timeout) {
        setIsPageLoading(false);
      } else {
        setTimeout(routeEventEnd, 2000);
      }
    };
    Router.events.on('routeChangeStart', routeEventStart);
    Router.events.on('routeChangeComplete', routeEventEnd);
    Router.events.on('routeChangeError', routeEventEnd);
    return () => {
      Router.events.off('routeChangeStart', routeEventStart);
      Router.events.off('routeChangeComplete', routeEventEnd);
      Router.events.off('routeChangeError', routeEventEnd);
    };
  }, []);
  return { isPageLoading };
};
