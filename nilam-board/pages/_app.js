import Layout from '@/components/Layout/layout';
import { store } from '@/redux/store/store';
import '@/styles/globals.css';
import '../styles/layout.css';
import '../styles/navbar.css';
import '../styles/auction-table.css';

import { Provider } from 'react-redux';
import ModalController from '@/components/utils/modal/ModalController';

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <ModalController />
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
