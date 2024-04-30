import https from 'https';

export const FileInfo = {
  async getContentType(url: string): Promise<string | undefined> {
    return new Promise((resolve, reject) => {
      https
        .request(url, { method: 'HEAD', timeout: 1000 }, (res) => resolve(res.headers['content-type']))
        .on('error', reject)
        .end();
    });
  },
};
