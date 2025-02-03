import * as z from 'zod';

export type TokenAttributeDisplayType = z.infer<typeof TokenAttributeDisplayType>;
export const TokenAttributeDisplayType = z.enum(['boost_number', 'boost_percentage', 'number', 'date']);

export type TokenAttribute = z.infer<typeof TokenAttribute>;
export const TokenAttribute = z.object({
  trait_type: z.string(),
  value: z.union([z.string(), z.number(), z.boolean()]),
  display_type: TokenAttributeDisplayType.optional(),
});

export type TokenDefinition = z.infer<typeof TokenDefinition>;
export const TokenDefinition = z.object({
  name: z.string(),
  description: z.string(),
  image: z.string().optional(),
  animationUrl: z.string().optional(),
  externalUrl: z.string().url().optional(),
  attributes: TokenAttribute.array(),
});

export function tokenMetadataFromTokenDefinition(token: TokenDefinition): string {
  // the order of the fields here affects the output JSON
  const fieldsMap: Record<keyof TokenDefinition, string> = {
    name: 'name',
    description: 'description',
    externalUrl: 'external_rl',
    image: 'image',
    animationUrl: 'animation_url',
    attributes: 'attributes',
  };

  const tokenMetadata = (Object.keys(fieldsMap) as Array<keyof TokenDefinition>).reduce<Record<string, unknown>>(
    (metadata, field) => {
      // skip empty fields
      if (token[field] !== null) metadata[fieldsMap[field]] = token[field];
      return metadata;
    },
    {},
  );

  return JSON.stringify(tokenMetadata);
}
