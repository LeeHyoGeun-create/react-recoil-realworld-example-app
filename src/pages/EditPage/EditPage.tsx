import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import ShowError from '../../components/ShowError';
import { userInfoAtom } from '../../recoil/recoil_state';
import { getArticles, updateArticles } from '../../util/api';
import areAllFieldsFilled from '../../util/formValidation';
import { type TagItem } from '../CreatePage/TagList';
import {
  type FormFields,
  type ErrorObject,
  type DefaultArticleProps,
} from '../../types/article';
import defaultArticleObj from './DefaultValues';
import ArticleForm from '../../components/ArticleForm';

function EditPage(): JSX.Element {
  const [displayError, setDisplayError] = useState<ErrorObject>({});
  const [article, setArticle] =
    useState<DefaultArticleProps>(defaultArticleObj);
  const userInfo = useRecoilValue(userInfoAtom);
  const navigate = useNavigate();
  const { slug: updateSlug } = useParams();
  const { token } = userInfo.user;

  if (updateSlug === undefined) {
    throw Error();
  }

  useEffect(() => {
    void (async () => {
      try {
        const { article: responseArticle = defaultArticleObj, errors = {} } =
          await getArticles(token, updateSlug);
        setDisplayError(errors);
        setArticle(responseArticle);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [updateSlug]);

  const validateForm = (formObj: FormFields): boolean => {
    const { isFilled, errors } = areAllFieldsFilled(formObj);
    if (!isFilled) {
      setDisplayError(errors);
      return false;
    }
    return true;
  };

  const handleSubmit = async (
    form: FormFields,
    tagList: TagItem[],
  ): Promise<void> => {
    try {
      if (updateSlug === undefined) {
        console.error('No slug provided for update');
        return;
      }

      if (validateForm(form)) {
        const tags = tagList.map((tagItem) => tagItem.tag);
        const formObj = { ...form, tagList: tags };
        const { slug, errors = {} } = await updateArticles(
          formObj,
          token,
          updateSlug,
        );
        if (Object.keys(errors).length === 0) {
          navigate(`/article/${slug ?? ''}`);
        }
        setDisplayError(errors);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <ul className="error-messages">
              {displayError != null && <>{ShowError(displayError)}</>}
            </ul>
            <ArticleForm onFormSubmit={handleSubmit} defaultArticle={article} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPage;
