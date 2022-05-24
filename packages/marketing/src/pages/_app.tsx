import '../styles/index.css';
import React from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { GA_MEASUREMENT_ID } from '../env';

declare global {
  interface Window {
    gtag: any;
  }
}

const Container = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
`;

const PayPortalContainer = styled.div``;

type AppProps = {
  Component: any;
}

const App: React.FC<AppProps> = ({ Component }) => {
  const router = useRouter();

  const handleRouteChange = (url) => {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  };

  React.useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
  return (
    <Container suppressHydrationWarning>
      <PayPortalContainer id="SOLANA_PAY" />
      <Component />
    </Container>
  );
};

export default App;
