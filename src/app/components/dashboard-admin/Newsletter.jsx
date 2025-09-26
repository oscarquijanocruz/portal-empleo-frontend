export default function Newsletter() {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 col-span-1">
      <h2 className="text-sm font-semibold mb-2 bg-blue-50 text-black text-center p-1 rounded-md">
  Newsletter
</h2>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center text-[#0C1E39] font-bold">
          👤
        </div>
        <div>
          <p className="font-medium text-sm text-[#0066CC] cursor-pointer hover:underline">
            Título de artículo
          </p>
          <p className="text-xs text-gray-500">
            Lorem ipsum dolor sit amet, malorum labitur quo ad.
          </p>
        </div>
      </div>
    </div>
  );
}
