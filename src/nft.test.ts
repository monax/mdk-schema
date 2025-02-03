import { describe, expect, test } from 'vitest';
import { tokenMetadataFromTokenDefinition } from './nft.js';

describe('NFT', () => {
  test('tokenMetadataFromTokenDefinition', () => {
    expect(
      tokenMetadataFromTokenDefinition({
        name: 'Token Name',
        description: 'Token Description',
        image: 'https://example.com/image.png',
        animationUrl: 'https://example.com/animation.mp4',
        externalUrl: 'https://example.com',
        attributes: [{ trait_type: 'importance', value: '123', display_type: 'number' }],
      }),
    ).toMatchInlineSnapshot(
      `"{"name":"Token Name","description":"Token Description","external_rl":"https://example.com","image":"https://example.com/image.png","animation_url":"https://example.com/animation.mp4","attributes":[{"trait_type":"importance","value":"123","display_type":"number"}]}"`,
    );
  });
});
