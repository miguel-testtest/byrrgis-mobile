export default function PageHeader({ title, actions, action }) {
  const content = actions ?? action
  return (
    <div className="page-header">
      <h1 className="page-title">{title}</h1>
      {content && (
        <div className="page-header__actions">
          {content}
        </div>
      )}
    </div>
  )
}
