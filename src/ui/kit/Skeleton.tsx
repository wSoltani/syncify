/** Holds a list row's place while it loads, shaped like the row. */
export function SkeletonRow() {
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
