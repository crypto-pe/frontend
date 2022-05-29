import "styles/global.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "config/chakra.config";
import { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import { SEO } from "config/seo.config";
import NextNProgress from "nextjs-progressbar";
import { useSessionStore } from "store/session";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import { JwtTokenDecoded } from "types/JwtToken";
import { getAuthHeaders } from "utils/jwt";
import client from "utils/client";

function MyApp({ Component, pageProps }: AppProps) {
  const { setSession, jwt, setLoading } = useSessionStore(state => state);

  useEffect(() => {
    if (jwt) {
      console.log("Check");
      const data = jwtDecode<JwtTokenDecoded>(jwt);

      if (data) {
        setLoading(true);
        client
          .getAccount({ address: data.account }, getAuthHeaders(jwt))
          .then(res => {
            console.log(res);
            setSession({ jwt, account: res.account });
          })
          .catch(err => console.log(err))
          .finally(() => {
            setLoading(false);
          });
      }
    } else {
      setLoading(false);
    }
  }, [jwt]);

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
        <NextNProgress />
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
