import Head from 'next/head'
import Header from './header'

export default ({ children, loggedInUser, title = 'This is the default title' }) => (
  <div>
    <Head>
      <title>{ title }</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <link rel='stylesheet' href='/static/css/bundle.css' />
    </Head>
    <Header loggedInUser={loggedInUser} />

    { children }
  </div>
)