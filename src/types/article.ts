interface Author {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

export interface DefaultArticleProps {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Author;
}

export interface FormFields {
  title: string;
  description: string;
  body: string;
}

export interface ErrorObject {
  key?: string;
  value?: string;
}
