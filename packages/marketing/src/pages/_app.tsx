import '../styles/index.css';
import React from 'react';
import styled from '@emotion/styled';

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
  return (
    <Container suppressHydrationWarning>
      <PayPortalContainer id="SOLANA_PAY" />
      <Component />
    </Container>
  );
};

export default App;
