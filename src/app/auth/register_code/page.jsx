"use client";
import { useForm } from "react-hook-form";

function VerifyEmailPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    console.log("Código ingresado:", data.code);
    // API
  });

  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-100">
      <div className="bg-gray-100 rounded-2xl shadow-lg w-3/4 flex overflow-hidden">
        <div className="w-1/2 p-40 flex flex-col justify-center">
          <div className="flex justify-center mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="w-24 h-24 text-blue-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-gray-700 mb-2 text-center">
            Verifica tu correo electrónico
          </h2>
          <p className="text-gray-500 mb-6 text-center">
            Enviamos un código de verificación a tu correo
          </p>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                {...register("code", { required: "Código requerido" })}
                className="w-full p-3 border rounded-lg"
                placeholder="Código de verificación"
              />
              {errors.code && (
                <span className="text-red-500 text-sm">
                  {errors.code.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-900 text-white px-6 py-2 rounded-lg mt-2 hover:bg-blue-700"
            >
              Enviar Código
            </button>
          </form>
        </div>

        <div
          className="w-1/2 flex justify-center items-center bg-cover bg-center"
          style={{ backgroundImage: "url('/fondo.jpg')" }}
        >
          <img src="/logo.png" alt="Logo" className="w-80 h-80 relative z-10" />
        </div>
      </div>
    </div>
  );
}

export default VerifyEmailPage;
