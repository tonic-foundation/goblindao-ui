import { useEffect } from 'react';
import { useTitle } from 'react-use';
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';

const titleState = atom({
  key: 'global.page-title-state',
  default: 'Tonic',
});

const fullTitleState = selector({
  key: 'global.page-full-title-state',
  get({ get }) {
    const title = get(titleState);
    return `${title} - Tonic`;
  },
});

export default function usePageTitle(title?: string) {
  const [_title, setTitle] = useRecoilState(titleState);
  const fullTitle = useRecoilValue(fullTitleState);

  useEffect(() => {
    if (title) {
      setTitle(title);
    }
  }, [setTitle, title]);

  // TODO: is this a good idea?
  useTitle(fullTitle, { restoreOnUnmount: true });

  return {
    title: _title,
    setTitle,
  };
}
