import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import ArticleForm from '../../components/ArticleForm';
import ShowError from '../../components/ShowError';
import { userInfoAtom } from '../../recoil/recoil_state';
import { createArticles } from '../../util/api';
import areAllFieldsFilled from '../../util/formValidation';
import { type TagItem } from './TagList';

function CreatePage(): JSX.Element {
  const [displayError, setDisplayError] = useState<
    Record<string, string> | undefined
  >(undefined);
  const userInfo = useRecoilValue(userInfoAtom);
  const navigate = useNavigate();
  const { token } = userInfo.user;

  interface FormFields {
    title: string;
    description: string;
    body: string;
  }

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
      if (validateForm(form)) {
        const tags = tagList.map((tagItem) => tagItem.tag);
        const formObj = { ...form, tagList: tags };
        const { slug, errors } = await createArticles(formObj, token);
        console.log(slug, errors);
        if (errors === undefined) {
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
            <ArticleForm onFormSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePage;
