import {
  FC,
  useEffect,
  useState,
  useTransition,
  SetStateAction,
  useCallback,
  memo,
} from 'react';
import tw from 'twin.macro';
import IconButton from '@/components/common/IconButton';
import Modal, { ModalHeader } from '@/components/common/Modal';
import TokenIcon from '@/components/common/TokenIcon';
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import useWalletBalance from '@/hooks/useWalletBalance';
import Typography from '../Typography';
import tokenService, { IToken } from '@/lib/services/near/tokenlist';

export const SUPPORTED_TOKENS = tokenService.getAllTokens();

/**
 * Optional function to call when clicking a token. This is in addition to
 * setting the `tokenState` atom; for many use cases, the `tokenState` atom on
 * its own will be enough.
 */
const tokenModalCallbackState = atom<((t: IToken) => unknown) | undefined>({
  key: 'token-modal-callback-state',
  default: undefined,
});

export const tokenModalVisibleState = atom<boolean>({
  key: 'token-modal-visible-state',
  default: false,
});

export const tokenState = atom<IToken>({
  key: 'selected-token-state',
  default: SUPPORTED_TOKENS[0],
});

const Wrapper = tw.div`
  overflow-hidden h-full flex flex-col items-stretch
  w-screen sm:(h-max max-h-[600px] max-w-[360px])
`;

interface ITokenModalSearchState {
  handleChange: (event: { target: { value: SetStateAction<string> } }) => void;
  value: string;
}

const TokenResult: FC<{ token: IToken; onClick: (t: IToken) => unknown }> = ({
  token,
  onClick,
  ...props
}) => {
  const { data: balance } = useWalletBalance(token.address);

  return (
    <button
      tw="flex items-center justify-between py-2 cursor-pointer hover:bg-alice-blue-500 dark:hover:bg-neutral-500"
      onClick={() => onClick(token)}
      {...props}
    >
      <div tw="flex gap-3 items-center">
        <TokenIcon token={token} />
        <div tw="text-left">
          <p tw="font-medium">{token.symbol}</p>
          <p tw="text-sm opacity-40">{token.name}</p>
        </div>
      </div>
      <div>
        <Typography.Currency
          value={balance}
          unit={token.symbol}
          fallback="---"
          unitAfter
        />
      </div>
    </button>
  );
};

interface ITokenModalContentState {
  onClose: () => void;
  hasSearch?: boolean;
}

const TokensModalContent: FC<ITokenModalContentState> = ({ onClose }) => {
  const [, startTransition] = useTransition();
  const [search, setSearch] = useState<string>('');
  const [tokens, setTokens] = useState<IToken[]>(SUPPORTED_TOKENS);
  const setTokenState = useSetRecoilState(tokenState);
  const customCb = useRecoilValue(tokenModalCallbackState);

  function handleSearch(event: { target: { value: SetStateAction<string> } }) {
    startTransition(() => {
      setSearch(event.target.value);
    });
  }

  function handleTokenClick(token: IToken) {
    setTokenState(token);
    if (customCb) {
      customCb(token);
    }
    onClose();
  }

  useEffect(() => {
    if (search.trim()) {
      const query = search.trim().toLowerCase();
      setTokens((tokens) =>
        tokens.filter((token: IToken) =>
          token.name.toLowerCase().includes(query)
        )
      );
    } else {
      setTokens(SUPPORTED_TOKENS);
    }
  }, [search]);

  return (
    <Wrapper>
      <ModalHeader tw="justify-between">
        <Typography.Heading>Select a token</Typography.Heading>
        <IconButton.Close onClick={onClose} />
      </ModalHeader>
      {/* <div tw="mt-2 px-6">
        <TokenModalSearch handleChange={handleSearch} value={search} />
      </div> */}
      <div tw="my-4 w-full flex flex-col items-stretch overflow-auto">
        {tokens.length ? (
          tokens.map((item) => {
            return (
              <TokenResult
                tw="px-6"
                key={item.address}
                token={item}
                onClick={handleTokenClick}
              />
            );
          })
        ) : (
          <div>No Tokens found</div>
        )}
      </div>
    </Wrapper>
  );
};

export const TokenPicker = () => {
  const [visible, setVisible] = useRecoilState(tokenModalVisibleState);

  return (
    <Modal
      mobileDisplay="drawer"
      visible={visible}
      onClose={() => setVisible(false)}
      render={({ closeModal }) => <TokensModalContent onClose={closeModal} />}
    />
  );
};

export function useTokenSelector() {
  const setVisible = useSetRecoilState(tokenModalVisibleState);
  const setCallback = useSetRecoilState(tokenModalCallbackState);

  const show = useCallback(
    (visible: boolean, cb?: (t: IToken) => unknown) => {
      setVisible(visible);
      // if you use a function to set an atom value, it gets called to produce
      // the next value. setting the value to a function requires a HOF like so
      setCallback(() => cb);
    },
    [setCallback, setVisible]
  );

  return {
    show,
  } as const;
}

export default memo(TokenPicker);
