import React from 'react';
import styled from '@emotion/styled';
import { GetServerSideProps } from 'next';
import NextImage from 'next/image';
import Link from 'next/link';
import Colors from '../styles/Colors';
import BedrockMark from '../../public/bedrock-logo.png';
import BedrockMarkWide from '../../public/bedrock-logo-wide.png';
import TwitterWhite from '../../public/twitter-white.png';
import GitHub from '../../public/github.png';

const Breakpoint = '1080px';

const Container = styled.div`
  position: absolute;
  width: fill-available;
  padding: 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;

  @media screen and (max-width: ${Breakpoint}) {
    padding: 24px;
  }
`;

const HoverLink = styled(Link)`
  &:hover {
    cursor: pointer;
  }
`;

type ImageContainerProps = {
  width: string;
};

const ImageContainer = styled.div<ImageContainerProps>`
  position: relative;
  width: ${(props) => props.width};
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const BedrockLogo = styled(ImageContainer)`
  border: 1px solid ${Colors.Purple};
  border-radius: 8px;
`;

const BedrockLogoWide = styled(ImageContainer)`
  width: 250px;
  margin-left: 16px;
`;

const ImageContainerGitHub = styled(ImageContainer)`
  top: -2px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;

  @media screen and (max-width: ${Breakpoint}) {
    flex-direction: column;
    width: 100%;
  }
`;

type NavigationProps = {};

const Navigation: React.FC<NavigationProps> = () => {
  /** Render */
  return (
    <Container>
      <HoverLink href="/">
        <Row>
          <BedrockLogo width="60px">
            <NextImage src={BedrockMark} objectFit="contain" />
          </BedrockLogo>
          <BedrockLogoWide width="250px">
            <NextImage src={BedrockMarkWide} objectFit="contain" />
          </BedrockLogoWide>
        </Row>
      </HoverLink>
      <Row>
        <a
          href="https://github.com/bedrock-foundation"
          style={{ marginRight: '32px' }}
        >
          <ImageContainerGitHub width="30px">
            <NextImage src={GitHub} objectFit="contain" />
          </ImageContainerGitHub>
        </a>
        <a href="https://twitter.com/on_bedrock">
          <ImageContainer width="30px">
            <NextImage src={TwitterWhite} objectFit="contain" />
          </ImageContainer>
        </a>
      </Row>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps<
  NavigationProps
> = async () => {
  return {
    props: {
      props: {},
    },
  };
};

export default Navigation;
