import * as z from 'zod';

export type FileData = z.infer<typeof FileData>;
export const FileData = z.object({
  name: z.string().describe('File name with extension'),
  data: z.string().describe('File data as a base 64 encoded string'),
  contentType: z.string(),
});

export const download = (url: string, filename: string) => {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob instanceof Blob ? blob : new Blob([blob]));
  download(url, filename);
  URL.revokeObjectURL(url);
};

// if we pass image link to `link.href`, then the browser will display it instead of downloading it on `link.click()`
export const downloadUrl = async (url: string, filename: string, onError?: () => void) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    downloadBlob(blob, filename);
  } catch {
    onError?.();
  }
};

export const basename = (url: string) => {
  const [cleanUrl] = url.split('?');
  const parts = cleanUrl.split('/');
  return parts[parts.length - 1];
};

/** Includes a dot */
export const extension = (url: string) => {
  const filename = basename(url);
  const parts = filename.split('.');
  return parts.length > 1 ? `.${parts[parts.length - 1]}` : '';
};

export const downloadFile = (file: FileData) => {
  const url = `data:${file.contentType};base64,${file.data}`;
  download(url, file.name);
};
