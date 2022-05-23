import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

/**
 * Custom 404 page that a user is redirected to if they attempt to load a page that DNE
 */
const Custom404: React.FC = () => {
  return (
    <Container />
  );
};

export default Custom404;
