import { atom } from 'recoil';

const userInfo = atom({
  key: 'useInfoAtom',
  default: {
    user: {
      email: 'string',
      token: 'string',
      username: 'string',
      bio: 'string',
      image: 'string',
    },
  },
});

export default userInfo;
