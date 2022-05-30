export * from '@bedrock-foundation/sdk';
export * from './hooks/useCreateLink';
export * from './hooks/usePollReferenceStatus';
import QRCodeDefault from 'react-qr-code';

// Hack for now until we can fix react-qr-code module resolution
export const QRCode: typeof QRCodeDefault = (QRCodeDefault as any).default;
