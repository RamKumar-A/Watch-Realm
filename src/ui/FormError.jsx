export default function FormError({ error }) {
  return error && <span className="text-sm text-red-600">{error}</span>;
}
