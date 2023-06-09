import { type DefaultArticleProps } from '../types/article';

interface FormFields {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}

const { VITE_API_URL } = import.meta.env;

type ResponseErrors = Record<string, string>;

interface Response {
  article?: DefaultArticleProps;
  slug?: string;
  errors?: ResponseErrors;
}

export const createArticles = async (
  formObj: FormFields,
  token: string,
): Promise<Response> => {
  try {
    const data = { article: formObj };
    let newError: ResponseErrors = {};
    const response = await fetch(`${VITE_API_URL}/articles`, {
      method: 'post',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    if (!response.ok) {
      newError = { ...responseData.errors };
      return { errors: newError };
    }
    const { slug } = responseData.article;
    return { slug };
  } catch (responseError) {
    if (responseError instanceof Error) {
      throw new Error(responseError.message);
    } else {
      throw new Error('An unexpected error occurred.');
    }
  }
};

export const updateArticles = async (
  formObj: FormFields,
  token: string,
  updateSlug: string,
): Promise<Response> => {
  try {
    const data = { article: formObj };
    let newError: ResponseErrors = {};
    const response = await fetch(`${VITE_API_URL}/articles/${updateSlug}`, {
      method: 'put',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    if (!response.ok) {
      newError = { ...responseData.errors };
      return { errors: newError };
    }
    const { slug } = responseData.article;
    return { slug };
  } catch (responseError) {
    if (responseError instanceof Error) {
      throw new Error(responseError.message);
    } else {
      throw new Error('An unexpected error occurred.');
    }
  }
};

export const getArticles = async (
  token: string,
  getSlug: string,
): Promise<Response> => {
  try {
    let newError: ResponseErrors = {};
    const response = await fetch(`${VITE_API_URL}/articles/${getSlug}`, {
      method: 'get',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const responseData = await response.json();
    if (!response.ok) {
      newError = { ...responseData.errors };
      return { errors: newError };
    }
    const { article } = responseData;
    return { article };
  } catch (responseError) {
    if (responseError instanceof Error) {
      throw new Error(responseError.message);
    } else {
      throw new Error('An unexpected error occurred.');
    }
  }
};
