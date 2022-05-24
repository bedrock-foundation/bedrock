import React from 'react';
import styled from '@emotion/styled';
import { GetServerSideProps } from 'next';
import * as Polished from 'polished';
import { NextSeo } from 'next-seo';
import Navigation from '../components/Navigation';
import Text, { TextAsEnum, TextTypesEnum } from '../elements/Text';
import Colors from '../styles/Colors';

const Breakpoint = '1080px';

const Container = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  width: fill-available;
  align-items: center;
  padding: 0 24px;
`;

const Page = styled.div`
  position: relative;
  max-width: ${Breakpoint};
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
`;

const Code = styled.code`
  padding: 16px 24px;
  border-radius: 8px;
  background-color: ${Colors.DarkBlue};
  border: 1px solid ${Colors.Purple};
  font-size: 16px;
  color: ${Colors.White};
  font-family: monospace;
  display: inline;
  width: fit-content;
  margin-bottom: 24px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;

  @media screen and (max-width: ${Breakpoint}) {
    flex-direction: column;
    width: 100%;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (max-width: ${Breakpoint}) {
    flex-direction: column;
    width: 100%;
  }
`;

const Button = styled.div<{ color?: string; width?: string }>`
  width: ${(props) => props?.width ?? '240px'};
  max-width: ${(props) => props?.width ?? '460px'};
  height: 46px;
  background-color: ${(props) => props.color};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.1s;
  margin-right: 16px;
  margin-bottom: 16px;

  @media screen and (max-width: ${Breakpoint}) {
    width: 100%;
  }

  &:hover {
    cursor: ${(props) => (props.onClick ? 'pointer' : null)};
    background-color: ${(props) => (props.onClick ? Polished.darken(0.05, props.color) : null)};
  }

  &:active {
    background-color: ${(props) => (props.onClick ? Polished.darken(0.1, props.color) : null)};
  }
`;

type IndexPageProps = {};

const IndexPage: React.FC<IndexPageProps> = () => {
  /** Render */
  return (
    <Container>
      <NextSeo
        title="Bedrock | The Solana Pay Toolkit"
        description="Bedrock is an SDK for Solana Pay"
      />
      <Navigation />
      <Page>
        <Row>
          <Column>
            <Text
              type={TextTypesEnum.Bold30}
              color={Colors.White}
              margin="0 0 16px"
            >
              The open-source Solana Pay toolkit
            </Text>
            <Text
              type={TextTypesEnum.Medium18}
              color={Colors.White}
              margin="0 0 24px"
            >
              <Text
                as={TextAsEnum.Span}
                color={Colors.White}
                type={TextTypesEnum.Bold18}
              >
                Bedrock
                {' '}
              </Text>
              is a composable set of open-source primitives for building
              <br />
              {' '}
              next-generation commerce experiences with Solana Pay.
            </Text>
            <Code>$ npm install --save @bedrock-foundation/sdk</Code>
            <Row>
              <Button
                color={Colors.Purple}
                onClick={() => {
                  window.open('https://github.com/bedrock-foundation/bedrock');
                }}
              >
                <Text type={TextTypesEnum.Medium16} color={Colors.White}>
                  View GitHub
                </Text>
              </Button>
              <Button
                color={Colors.Purple}
                onClick={() => {
                  window.open(
                    'https://calendly.com/on_bedrock/15-minute-meeting',
                  );
                }}
              >
                <Text type={TextTypesEnum.Medium16} color={Colors.White}>
                  Get in touch
                </Text>
              </Button>
            </Row>
          </Column>
        </Row>
      </Page>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps<IndexPageProps> = async () => {
  return {
    props: {
      props: {},
    },
  };
};

export default IndexPage;
