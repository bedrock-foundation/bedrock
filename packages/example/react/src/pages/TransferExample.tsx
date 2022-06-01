import React from 'react';
import {
  Bedrock,
  TokenTypes,
  TransferParams,
  useCreateLink,
  usePollReferenceStatus
} from '@bedrock-foundation/react-sdk';
import QRCode from 'react-qr-code';

const {
  core: { createTransferLink, getReferenceStatus }
} = new Bedrock('https://magically-production.ngrok.io');

type TransferExampleProps = {};

const TransferExample: React.FC<TransferExampleProps> = ({}) => {
  const [signature, setSignature] = React.useState<string | null>(null);
  const [error, setError] = React.useState<Error | null>(null);
  const [canceled, setCanceled] = React.useState<boolean>(false);

  const [transferParams] = React.useState<TransferParams>({
    wallet: 'Exxuw5WdrazbVLDs2g2A5zg2fJ9cZjwRM6mZaGD8Mnsx',
    size: 1,
    token: TokenTypes.USDC,
  });

  const {
    link,
    refs: { requestRef },
  } = useCreateLink(createTransferLink, transferParams);

  const { cancel } = usePollReferenceStatus(getReferenceStatus, {
    ref: requestRef,
    onComplete: (data) => {
      setSignature(data?.signature ?? null);
    },
    onError: setError,
    onCancel: () => setCanceled(true),
  });

  return (
    <div>
      <QRCode value={link} size={256} />
      {signature ? `Transaction Signature: ${signature}` : 'Waiting for confirmation...'}
      {error && `There was an error confirming the transaction: ${error}`}
      {canceled && `Transaction confirmation polling was canceled.`}
      <div onClick={() => cancel()}>Cancel</div>
    </div>
  );
};

export default TransferExample;
