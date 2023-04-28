import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom: persistUserInfo } = recoilPersist({
  key: 'realworld-userInfo', // this key is using to store data in local storage
  storage: localStorage, // configurate which stroage will be used to store the data
});

export const userInfoAtom = atom({
  key: 'userInfoAtom',
  default: {
    user: {
      email: 'string',
      token: 'string',
      username: 'string',
      bio: 'string',
      image: 'string',
    },
  },
  effects_UNSTABLE: [persistUserInfo],
});

export const isLoginSelector = selector({
  key: 'isLoginSelector',
  get: ({ get }) => {
    const userInfo = get(userInfoAtom);
    return Object.keys(userInfo).length > 0;
  },
});
