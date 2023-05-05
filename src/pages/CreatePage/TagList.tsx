export interface TagItem {
  id: string;
  tag: string;
}

interface TagListProps {
  tagList: TagItem[];
  onRemoveTag: (id: string) => void;
}

function TagList({ tagList, onRemoveTag }: TagListProps): JSX.Element {
  return (
    <div className="tag-list">
      {tagList.map(({ id, tag }) => (
        <span key={id} className="tag-default tag-pill ng-binding ng-scope">
          <button
            type="button"
            onClick={() => {
              onRemoveTag(id);
            }}
            className="ion-close-round "
            aria-label="Remove tag"
            style={{ background: 'none', border: 'none', outline: 'none' }}
          />
          {tag}
        </span>
      ))}
    </div>
  );
}

export default TagList;
