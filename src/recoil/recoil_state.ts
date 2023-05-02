import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom: persistUserInfo } = recoilPersist({
  key: 'realworld-userInfo', // this key is using to store data in local storage
  storage: localStorage, // configurate which stroage will be used to store the data
});

interface User {
  email: string | null;
  token: string | null;
  username: string | null;
  bio: string | null;
  image: string | null;
}

interface UserInfo {
  user: User;
}

export const userInfoAtom = atom<UserInfo>({
  key: 'userInfoAtom',
  default: {
    user: {
      email: null,
      token: null,
      username: null,
      bio: null,
      image: null,
    },
  },

  effects_UNSTABLE: [persistUserInfo],
});

export const isLoginSelector = selector({
  key: 'isLoginSelector',
  get: ({ get }) => {
    const userInfo = get(userInfoAtom);
    return userInfo !== null;
  },
});
