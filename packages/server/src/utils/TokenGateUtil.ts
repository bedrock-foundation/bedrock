import { PublicKey } from '@solana/web3.js';
import { Metaplex, JsonMetadataAttribute, Nft } from '@metaplex-foundation/js-next';
import { TokenGate, TokenDataSummary } from '@bedrock-foundation/sdk';
import RPCConnection from './RPCConnection';

const metaplex = Metaplex.make(RPCConnection);

export async function applyAccessGate(gate: TokenGate, publicKey: PublicKey): Promise<TokenDataSummary[]> {
  const {
    collectionId,
    firstCreatorId,
    updateAuthorityId,
    traits,
  } = gate;
  const nfts = await metaplex.nfts().findAllByOwner(publicKey);

  const selectedNfts: Nft[] = nfts.filter((nft) => {
    if (collectionId) {
      return collectionId === nft?.collection?.key?.toBase58() ?? null;
    }

    if (firstCreatorId) {
      return firstCreatorId === nft?.creators?.[0].address?.toBase58() ?? null;
    }

    if (updateAuthorityId) {
      return updateAuthorityId === nft?.updateAuthority?.toBase58() ?? null;
    }

    return false;
  });

  const convertTraits = (traits: Record<string, string | number>): string[] => {
    return Object.entries(traits).map(([key, value]) => {
      return `${key}:${value}`;
    }).sort();
  };

  const convertMetaplexAttributesToTraits = (attributes: JsonMetadataAttribute[]): Record<string, string | number> => {
    return attributes.reduce((cur: Record<string, string | number>, next: JsonMetadataAttribute) => {
      const key: string | undefined = next.trait_type;
      if (!key) return cur;
      cur[key] = next.value as string;
      return cur;
    }, {});
  };

  const tokens: TokenDataSummary[] = (await Promise.all(selectedNfts.map(async (nft) => {
    const metadata = await nft.metadataTask.run();
    return {
      name: nft.name,
      mint: nft?.mint?.toBase58(),
      image: metadata.image,
      traits: convertMetaplexAttributesToTraits(metadata.attributes ?? []),
    };
  }))).filter((nft: TokenDataSummary) => {
    // if no traits are specified, return all tokens
    if (!traits || Object.keys(traits ?? {}).length === 0) {
      return nft;
    }

    // if traits are specified, return tokens that match the traits
    const specifiedTraits = convertTraits(traits);
    const tokenTraits = convertTraits(nft.traits);

    const invalidTrait = specifiedTraits.find((trait) => {
      return !tokenTraits.includes(trait);
    });

    return !invalidTrait;
  });

  return tokens;
}
