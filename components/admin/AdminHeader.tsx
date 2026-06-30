type AdminHeaderProps = {
  title: string;
  description?: string;
  action?: React.ReactNode;
};

export default function AdminHeader({
  title,
  description,
  action,
}: AdminHeaderProps) {
  return (
    <header className="admin-header">
      <div>
        <h1 className="admin-title">{title}</h1>
        {description ? <p className="admin-description">{description}</p> : null}
      </div>
      {action ? <div className="admin-header-action">{action}</div> : null}
    </header>
  );
}
