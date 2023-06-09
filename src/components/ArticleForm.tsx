import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useInputs from '../hooks/useInputs';
import TagList, { type TagItem } from '../pages/CreatePage/TagList';
import defaultArticleObj from '../pages/EditPage/DefaultValues';
import { type DefaultArticleProps, type FormFields } from '../types/article';

interface ArticleFormProps {
  onFormSubmit: (form: FormFields, tagList: TagItem[]) => Promise<void>;

  /*
  그러나 ESLint 규칙은 이 형태의 기본 prop 할당을 인식하지 못하며, 대신에 defaultProps의 사용을 기대합니다. defaultProps는 레거시 기능이며 TypeScript의 엄격한 널 체크와 잘 작동하지 않을 수 있기 때문에, TypeScript에서는 당신이 하고 있는 것처럼 기본 매개변수를 사용하는 것이 선호됩니다.
  */
  // eslint-disable-next-line react/require-default-props
  defaultArticle?: DefaultArticleProps;
}

function ArticleForm({
  onFormSubmit,
  defaultArticle = defaultArticleObj,
}: ArticleFormProps): JSX.Element {
  const { form, onChange, setValues } = useInputs({
    title: defaultArticle.title,
    description: defaultArticle.description,
    body: defaultArticle.body,
  });
  const { title, description, body } = form;
  const [tag, setTag] = useState('');
  const [tagList, setTagList] = useState<TagItem[]>([]);

  useEffect(() => {
    setValues(defaultArticle);
    setTagList(
      defaultArticle.tagList.map((tagValue) => ({
        tag: tagValue,
        id: uuidv4(),
      })),
    );
  }, [defaultArticle]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onFormSubmit(form, tagList).catch((err) => {
      console.error(err);
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTag(e.target.value);
  };

  const handleFormKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  const onRemoveTag = (id: string): void => {
    setTagList((prev) => prev.filter((tagItem) => tagItem.id !== id));
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setTagList((prev) => [{ id: uuidv4(), tag }, ...prev]);
      setTag('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <fieldset className="form-group">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Article Title"
            name="title"
            value={title}
            onChange={onChange}
            onKeyDown={handleFormKeyDown}
          />
        </fieldset>
        <fieldset className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="What's this article about?"
            name="description"
            value={description}
            onChange={onChange}
            onKeyDown={handleFormKeyDown}
          />
        </fieldset>
        <fieldset className="form-group">
          <textarea
            className="form-control"
            rows={8}
            placeholder="Write your article (in markdown)"
            name="body"
            value={body}
            onChange={onChange}
          />
        </fieldset>
        <fieldset className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter tags"
            name="tag"
            value={tag}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <TagList tagList={tagList} onRemoveTag={onRemoveTag} />
        </fieldset>
        <button className="btn btn-lg pull-xs-right btn-primary" type="submit">
          Publish Article
        </button>
      </fieldset>
    </form>
  );
}

export default ArticleForm;
