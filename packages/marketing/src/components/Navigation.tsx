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

const GitHubLink = styled.a`
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

  @media screen and (max-width: ${Breakpoint}) {
    display: none;
  }
`;

const ImageContainerGitHub = styled(ImageContainer)`
  top: -2px;
  margin-right: 24px;

  @media screen and (max-width: ${Breakpoint}) {
   top: 0px;
  }
`;

const Row = styled.div<{ align?: string }>`
  display: flex;
  flex-direction: row;
  justify-items: ${(props) => props.align};
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
      <Row align="flex-end">
        <ImageContainerGitHub width="30px">
          <GitHubLink href="https://github.com/bedrock-foundation/bedrock">
            <NextImage src={GitHub} objectFit="contain" />
          </GitHubLink>
        </ImageContainerGitHub>

        <ImageContainer width="30px">
          <a href="https://twitter.com/on_bedrock">
            <NextImage src={TwitterWhite} objectFit="contain" />
          </a>
        </ImageContainer>
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
