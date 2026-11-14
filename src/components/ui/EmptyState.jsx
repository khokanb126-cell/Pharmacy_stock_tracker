export function EmptyState({ title, body, action }) {
  return (
    <div className="empty">
      <p className="empty__stamp">Rx — ∅</p>
      <h3>{title}</h3>
      <p>{body}</p>
      {action}
    </div>
  );
}
