import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html data-theme="light">
      <Head />
    <body className={"max-w-full"}>
      <Main />
    <NextScript />
    </body>
    </Html>
  )
}