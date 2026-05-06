import { Construction } from 'lucide-react';

interface ComingSoonProps {
  pageName: string;
}

export default function ComingSoon({ pageName }: ComingSoonProps) {
  return (
    <div className="flex flex-1 items-center justify-center py-24">
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-brand-100 bg-brand-50 px-12 py-10 shadow-sm">
        <Construction className="h-12 w-12 text-brand-500" aria-hidden="true" />
        <h2 className="text-xl font-semibold text-gray-900">{pageName}</h2>
        <p className="text-sm text-gray-500">
          This page is under construction. Check back soon.
        </p>
      </div>
    </div>
  );
}
