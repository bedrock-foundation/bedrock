import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import {
  Bedrock, TokenTypes, TransferParams,
} from '@bedrock-foundation/sdk';
import QRCode from 'react-qr-code';
import styles from '../styles/Home.module.css';

const { transfer } = new Bedrock('http://localhost:3001');

const Home: NextPage = () => {
  const [transferParams] = React.useState<TransferParams>({
    wallet: 'Exxuw5WdrazbVLDs2g2A5zg2fJ9cZjwRM6mZaGD8Mnsx',
    size: 1,
    payerToken: TokenTypes.USDC,
  });

  const [{ link, ref }] = React.useState(transfer.createLink(transferParams));

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to
          {' '}
          <a href="https://nextjs.org">Bedrock Next.js SDK</a>
        </h1>

        <p className={styles.description}>
          <QRCode value={link} size={256} />
        </p>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by
          {' '}
          <span className={styles.logo}>
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              width={72}
              height={16}
            />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
