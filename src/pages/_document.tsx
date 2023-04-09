import { Html, Head, Main, NextScript } from "next/document";

function Document() {
  return (
    <Html>
      <Head>
        <meta charSet="utf-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#eac9c1" />
        <link rel="icon" href="/icon.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
        {/* Cloudflare Web Analytics */}
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "b3c6dfd68ac244ca8f3df0e722ac0b5b"}'
        ></script>
      </body>
    </Html>
  );
}

export default Document;
