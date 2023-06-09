import { type DefaultArticleProps } from '../../types/article';

const defaultArticleObj: DefaultArticleProps = {
  slug: '',
  title: '',
  description: '',
  body: '',
  tagList: [],
  createdAt: '',
  updatedAt: '',
  favorited: false,
  favoritesCount: 0,
  author: {
    username: '',
    bio: '',
    image: '',
    following: false,
  },
};

export default defaultArticleObj;
