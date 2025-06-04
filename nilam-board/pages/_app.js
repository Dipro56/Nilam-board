import { store } from '@/redux/store/store';
import '@/styles/globals.css';
import '../styles/layout.css';
import '../styles/navbar.css';
import '../styles/auction-table.css';

import { Provider } from 'react-redux';
import ModalController from '@/components/utils/modal/ModalController';
// import Layout from '@/components/layout/layout.js';

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ModalController />
      <Component {...pageProps} />
      {/* <Layout>
        <ModalController />
        <Component {...pageProps} />
      </Layout> */}
    </Provider>
  );
}
