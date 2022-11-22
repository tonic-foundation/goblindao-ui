import { WalletSelectorModal } from '@/components/WalletSelector/WalletSelectorModal';
import { WalletSelectorContextProvider } from '@/state/containers/WalletSelectorContainer';
import { cache } from '@emotion/css';
import { CacheProvider } from '@emotion/react';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { RecoilRoot } from 'recoil';
import { Toaster } from 'react-hot-toast';
import GlobalStyles from './../styles/GlobalStyles';
import { TxToastProvider } from '@/hooks/useWalletRedirectHash';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <CacheProvider value={cache}>
      <RecoilRoot>
        <GlobalStyles />
        <ThemeProvider enableSystem={true} attribute="class">
          <WalletSelectorContextProvider>
            <TxToastProvider>
              <WalletSelectorModal />
              <Component {...pageProps} />
              <Toaster position={'bottom-center'} />
            </TxToastProvider>
          </WalletSelectorContextProvider>
        </ThemeProvider>
      </RecoilRoot>
    </CacheProvider>
  );
};

export default App;
