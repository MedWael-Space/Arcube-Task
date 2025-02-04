import Head from "next/head";
import UrlShortener from "../components/UrlShortener";


export default function Home() {
  return (
    <>
      <Head>
        <title>URL Shortener</title>
        <meta name="description" content="URL Shortener APP" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
      <UrlShortener />
    </div>  
   </> 
  );
}
