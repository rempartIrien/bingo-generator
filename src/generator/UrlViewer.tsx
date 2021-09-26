import React from 'react';

interface UrlViewerProps {
  url: string;
}

function UrlViewer({ url }: UrlViewerProps): JSX.Element {
  async function copyToClipboard(url: string): Promise<void> {
    await navigator.clipboard.writeText(url);
  }

  return (
    <>
      <p>
        Bingo url:{' '}
        <a target="_blank" rel="noreferrer noopener" href={url}>
          {url}
        </a>
      </p>
      <p>
        Copy the above url or click this button to share it:&nbsp;
        <button type="button" onClick={() => copyToClipboard(url)}>
          Copy url to clipboard
        </button>
      </p>
    </>
  );
}

export default UrlViewer;
