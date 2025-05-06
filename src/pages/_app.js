import "@/styles/globals.css";
import { Provider } from 'react-redux';
import { store } from '@/store';
import Layout from '@/components/layout/Layout';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isAuthPage = router.pathname === '/auth';

  return (
    <Provider store={store}>
      {isAuthPage ? (
        <Component {...pageProps} />
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </Provider>
  );
}
