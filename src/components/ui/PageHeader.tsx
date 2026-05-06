interface PageHeaderProps {
  breadcrumb: string;
  title: string;
  subtitle: string;
}

export default function PageHeader({ breadcrumb, title, subtitle }: PageHeaderProps) {
  return (
    <div className="mb-4">
      <p className="mb-1 text-xs uppercase tracking-wide text-gray-500">{breadcrumb}</p>
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      <p className="mt-0.5 text-sm text-gray-500">{subtitle}</p>
    </div>
  );
}
