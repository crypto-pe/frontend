import "styles/global.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "config/chakra.config";
import { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import { SEO } from "config/seo.config";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        title={pageProps?.seo?.title || SEO.DEFAULT_TITLE}
        titleTemplate={SEO.DEFAULT_TITLE_TEMPLATE}
        description={SEO.DEFAULT_DESCRIPTION}
        // canonical={url}
        openGraph={{
          type: "website",
          locale: "en_US",
          // url,
          site_name: SEO.SITE_NAME,
          title: SEO.SITE_NAME,
          description: SEO.DEFAULT_DESCRIPTION,
          images: [
            {
              url: SEO.DEFAULT_OG_IMAGE,
              alt: SEO.SITE_NAME
            }
          ]
        }}
        twitter={{
          handle: SEO.TWITTER_HANDLE,
          site: SEO.TWITTER_HANDLE,
          cardType: "summary_large_image"
        }}
        additionalLinkTags={[
          {
            rel: "shortcut icon",
            href: SEO.FAVICON_LINK
          }
        ]}
      />
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
