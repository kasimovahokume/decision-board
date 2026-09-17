interface ResultBadgeProps {
  label: string;
}

export default function ResultBadge({ label }: ResultBadgeProps) {
  return (
    <div className="mt-4 bg-green-50 border border-green-200 text-green-800 rounded-lg px-4 py-3 text-sm">
      <strong className="font-semibold">Nəticə:</strong> {label}
    </div>
  );
}