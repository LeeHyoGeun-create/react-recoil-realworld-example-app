import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom: persistUserInfo } = recoilPersist({
  key: 'realworld-userInfo', // this key is using to store data in local storage
  storage: localStorage, // configurate which stroage will be used to store the data
});

interface User {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
}

interface UserInfo {
  user: User;
}

export const userInfoAtom = atom<UserInfo>({
  key: 'userInfoAtom',
  default: {
    user: {
      email: '',
      token: '',
      username: '',
      bio: '',
      image: '',
    },
  },

  effects_UNSTABLE: [persistUserInfo],
});

export const isLoginSelector = selector({
  key: 'isLoginSelector',
  get: ({ get }) => {
    const userInfo = get(userInfoAtom);
    return userInfo.user.token.length > 0;
  },
});
