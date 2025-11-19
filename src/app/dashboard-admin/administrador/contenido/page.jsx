"use client";
import { useState, useEffect } from "react";
import { Bell, MessageSquare, Search, Trash2, Upload, Eye, ArrowUp, ArrowDown } from "lucide-react";

export default function ContentManagement() {
  const [filter, setFilter] = useState("");
  const [banners, setBanners] = useState([]);
  const [newsletter, setNewsletter] = useState({ title: "", content: "" });
  const [showPreview, setShowPreview] = useState(null);
  const [history, setHistory] = useState([]);

  // Cargar banners guardados localmente
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("banners"));
    if (saved) setBanners(saved);
  }, []);

  // Guardar banners en localStorage
  useEffect(() => {
    localStorage.setItem("banners", JSON.stringify(banners));
  }, [banners]);

  // Subir imagen
  const handleAddBanner = (e) => {
    const file = e.target.files[0];
    if (file && banners.length < 5) {
      const url = URL.createObjectURL(file);
      setBanners([...banners, { id: Date.now(), url }]);
    } else if (banners.length >= 5) {
      alert("Solo se permiten 5 banners como máximo.");
    }
  };

  // Eliminar un banner
  const handleDeleteBanner = (id) => {
    setBanners(banners.filter((b) => b.id !== id));
  };

  // Limpiar toda la galería
  const handleClearAll = () => {
    if (confirm("¿Deseas eliminar todos los banners?")) {
      setBanners([]);
    }
  };

  // Cambiar orden
  const moveBanner = (index, direction) => {
    const newBanners = [...banners];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newBanners.length) return;
    [newBanners[index], newBanners[targetIndex]] = [newBanners[targetIndex], newBanners[index]];
    setBanners(newBanners);
  };

  // Enviar newsletter
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newsletter.title && newsletter.content) {
      const newEntry = {
        ...newsletter,
        date: new Date().toLocaleString(),
      };
      setHistory([newEntry, ...history]);
      setNewsletter({ title: "", content: "" });
      alert("✅ Newsletter enviada correctamente.");
    } else {
      alert("Por favor, completa todos los campos.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      {/* Barra superior */}
      <header className="bg-white rounded-lg shadow mb-6 px-4 py-2 flex items-center">
        <div className="flex items-center flex-1">
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4 ml-6 text-gray-600">
          <button className="hover:text-blue-600">
            <Bell size={22} />
          </button>
          <button className="hover:text-blue-600">
            <MessageSquare size={22} />
          </button>
        </div>
      </header>

      {/* Contenedor principal */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Gestión de Contenidos
        </h2>

        {/* Galería de banners */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700">
              Galería de Banners ({banners.length}/5)
            </h3>
            {banners.length > 0 && (
              <button
                onClick={handleClearAll}
                className="text-red-600 text-sm hover:underline"
              >
                Eliminar todos
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* Subir imagen */}
            <label className="flex flex-col items-center justify-center w-40 h-32 border-2 border-dashed border-gray-400 rounded-xl cursor-pointer hover:bg-gray-50">
              <Upload size={32} className="text-gray-500 mb-1" />
              <span className="text-sm text-gray-600">Subir imagen</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAddBanner}
              />
            </label>

            {/* Imágenes cargadas */}
            {banners.map((banner, index) => (
              <div
                key={banner.id}
                className="relative w-40 h-32 border rounded-xl overflow-hidden shadow-sm group"
              >
                <img
                  src={banner.url}
                  alt="Banner"
                  className="object-cover w-full h-full cursor-pointer"
                  onClick={() => setShowPreview(banner.url)}
                />
                <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition">
                  <button
                    onClick={() => moveBanner(index, "up")}
                    className="bg-gray-200 p-1 rounded"
                  >
                    <ArrowUp size={14} />
                  </button>
                  <button
                    onClick={() => moveBanner(index, "down")}
                    className="bg-gray-200 p-1 rounded"
                  >
                    <ArrowDown size={14} />
                  </button>
                  <button
                    onClick={() => handleDeleteBanner(banner.id)}
                    className="bg-red-500 text-white p-1 rounded"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Newsletter
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Título
              </label>
              <input
                type="text"
                value={newsletter.title}
                onChange={(e) =>
                  setNewsletter({ ...newsletter, title: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Escribe el título del newsletter..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contenido
              </label>
              <textarea
                rows="4"
                value={newsletter.content}
                onChange={(e) =>
                  setNewsletter({ ...newsletter, content: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Escribe el contenido del newsletter..."
              ></textarea>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Enviar
              </button>
            </div>
          </form>

          {/* Historial de newsletters */}
          {history.length > 0 && (
            <div className="mt-6">
              <h4 className="font-semibold text-gray-700 mb-3">
                Historial de newsletters enviados
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                {history.map((item, index) => (
                  <li
                    key={index}
                    className="border p-3 rounded-md hover:bg-gray-50"
                  >
                    <strong>{item.title}</strong> — {item.date}
                    <p className="text-gray-500 text-xs">
                      {item.content.slice(0, 60)}...
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Modal de vista previa */}
      {showPreview && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
          onClick={() => setShowPreview(null)}
        >
          <img
            src={showPreview}
            alt="Vista previa"
            className="max-w-3xl max-h-[80vh] rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
}
