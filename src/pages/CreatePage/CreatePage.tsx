import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ShowError from '../../components/ShowError';
import useInputs from '../../hooks/useInputs';
import areAllFieldsFilled from '../../util/formValidation';
import TagList, { type TagItem } from './TagList';

function CreatePage(): JSX.Element {
  const [form, onChange] = useInputs({
    title: '',
    description: '',
    body: '',
  });
  const { title, description, body } = form;
  const [displayError, setDisplayError] = useState({});

  console.log(Object.entries(form));

  const [tag, setTag] = useState('');
  const [tagList, setTagList] = useState<TagItem[]>([]);

  const validateForm = (formObj: Record<string, string>): boolean => {
    const [isFilled, errors] = areAllFieldsFilled(formObj);
    if (!isFilled) {
      setDisplayError(errors);
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (validateForm(form)) {
      (async () => {})().catch((submitError) => {
        console.error(submitError);
      });
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    if (event.key === 'Enter') {
      setTagList((prev) => [{ id: uuidv4(), tag }, ...prev]);
      setTag('');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTag(e.target.value);
  };

  const removeTag = (id: string): void => {
    setTagList((prev) => prev.filter((tagItem) => tagItem.id !== id));
  };

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <ul className="error-messages">
              {!(Object.keys(displayError).length === 0) && (
                <>{ShowError(displayError)}</>
              )}
            </ul>
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

                  <TagList tagList={tagList} onRemoveTag={removeTag} />
                </fieldset>
                <button
                  className="btn btn-lg pull-xs-right btn-primary"
                  type="submit"
                >
                  Publish Article
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePage;
