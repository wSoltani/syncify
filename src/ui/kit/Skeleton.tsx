/**
 * Holds a list row's place while it loads, shaped like the row: a backup's
 * two lines, or an item's one line with its pip, size, switch and menu.
 */
export function SkeletonRow(props: { shape?: "backup" | "item" }) {
  if (props.shape === "item") {
    return (
      <li className="syncify-list-item" aria-hidden="true">
        <div className="syncify-row" data-lines="1">
          <span className="syncify-row-leading">
            <span className="syncify-skeleton" data-width="pip" />
          </span>
          <span className="syncify-row-name">
            <span className="syncify-skeleton" data-width="name" />
          </span>
          <span className="syncify-row-end">
            <span className="syncify-skeleton" data-width="size" />
            <span className="syncify-skeleton" data-width="switch" />
            <span className="syncify-skeleton" data-width="menu" />
          </span>
        </div>
      </li>
    );
  }
  return (
    <li className="syncify-list-item" aria-hidden="true">
      <div className="syncify-row" data-lines="2">
        <span className="syncify-row-name">
          <span className="syncify-skeleton" data-width="name" />
        </span>
        <span className="syncify-row-meta">
          <span className="syncify-skeleton" data-width="meta" />
        </span>
      </div>
    </li>
  );
}
