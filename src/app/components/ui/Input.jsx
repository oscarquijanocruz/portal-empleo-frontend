// Barra de búsqueda

export default function Input({ type = "text", placeholder = "", ...props }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...props}
    />
  );
}