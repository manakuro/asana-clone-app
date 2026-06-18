import NextHead from 'next/head';

const defaultDescription = '';
const defaultOGURL = '';
const defaultOGImage = '';

type Props = {
  title: string;
  description?: string;
  url?: string;
  ogImage?: string;
};

export function Head(props: Props) {
  return (
    <NextHead>
      <title>{props.title}</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta
        name="description"
        content={props.description || defaultDescription}
      />
      <meta property="og:url" content={props.url || defaultOGURL} />
      <meta property="og:title" content={props.title || ''} />
      <meta
        property="og:description"
        content={props.description || defaultDescription}
      />
      <meta name="twitter:site" content={props.url || defaultOGURL} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={props.ogImage || defaultOGImage} />
      <meta property="og:image" content={props.ogImage || defaultOGImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="robots" content="noindex" />
    </NextHead>
  );
}
