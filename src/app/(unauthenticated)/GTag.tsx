import Script from 'next/script';

function GTag() {
  return (
    <div>
      <Script src='https://www.googletagmanager.com/gtag/js?id=G-KJ7HNT5G96' />
      <Script id='google-analytics'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-KJ7HNT5G96');
        `}
      </Script>
    </div>
  );
}

export default GTag;
