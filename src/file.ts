export const FileInfo = {
  async getContentType(url: string): Promise<string | undefined> {
    return new Promise((resolve, reject) => {
      const ctl = new AbortController();
      setTimeout(() => ctl.abort('Request Timeout'), 1000);

      fetch(url, { method: 'HEAD', signal: ctl.signal, mode: 'cors' })
        .then((res) => resolve(res.headers.get('content-type') || undefined))
        .catch(reject);
    });
  },
};
