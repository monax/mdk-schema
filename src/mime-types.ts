export enum ImageMimeType {
  JPG = 'image/jpeg',
  // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
  JPEG = 'image/jpeg',
  PNG = 'image/png',
  GIF = 'image/gif',
  SVG = 'image/svg+xml',
  AVIF = 'image/avif',
  WEBP = 'image/webp',
}

export type ImageFileExtensions = typeof ImageFileExtensions;
export const ImageFileExtensions = Object.keys(ImageMimeType).map((e) => `.${e.toLowerCase()}`);

export enum TextMimeType {
  DOCX = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  JSON = 'application/json',
  PDF = 'application/pdf',
  MD = 'text/markdown',
  PLAIN = 'text/plain',
  HTML = 'text/html',
}

export type TextFileExtensions = typeof TextFileExtensions;
export const TextFileExtensions = Object.keys(TextMimeType).map((e) => `.${e.toLowerCase()}`);

export type DocumentMimeTypes = typeof DocumentMimeTypes;
export const DocumentMimeTypes = { ...TextMimeType, ...ImageMimeType };

export type DocumentMimeType = DocumentMimeTypes[keyof DocumentMimeTypes];

export const getKnownExtensionMimeType = (extension: string): DocumentMimeType | undefined => {
  return DocumentMimeTypes[extension.toUpperCase() as keyof DocumentMimeTypes];
};
