interface FormFields {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}

const { VITE_API_URL } = import.meta.env;

type ResponseErrors = Record<string, string>;

interface Response {
  slug: string;
  errors: ResponseErrors;
}

const createArticles = async (
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
    }
    const { slug } = responseData.article;
    return { slug, errors: newError };
  } catch (responseError) {
    if (responseError instanceof Error) {
      throw new Error(responseError.message);
    } else {
      throw new Error('An unexpected error occurred.');
    }
  }
};

export default createArticles;
