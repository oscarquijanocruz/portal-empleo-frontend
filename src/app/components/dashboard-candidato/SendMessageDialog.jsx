// Dialogo de envio de mensaje
"use client";
import { useState } from "react";
import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import { Paperclip, Send, SendHorizonal, X } from "lucide-react";

export default function SendMessageDialog({
  isOpen = false,
  onClose = () => {},
  onSend = () => {},
  placeholder = "Escribe tu mensaje...",
}) {
  const [message, setMessage] = useState("");
  const [attachedFile, setAttachedFile] = useState("");
  const [recipientUsername, setRecipientUsername] = useState("");

  const handleSend = () => {
    onSend?.(message);
    setMessage("");
    onClose();
    // Mandar mensaje a la API
    // fetch('/api/messages/send', { ... })
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log('Mensaje enviado:', data);
    //     onClose();
    //   })
    //   .catch(error => {
    //     console.error('Error enviando mensaje:', error);
    //   });

    // Redireccionar a la nueva conversación
    // window.location.href = `/messages/${data.id}`;   

    // Si ya existe la conversación, redirigir a ella
    // const conversationId = data.conversationId;
    // if (conversationId) {
    //   window.location.href = `/messages/${conversationId}`;
    // }

    // Si no existe la conversación, redirigir a la lista de conversaciones
    // window.location.href = '/messages';
  };

  const handleAttachment = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
    console.log("Tamaño:", sizeInMB, "MB");
    console.log("Archivo adjunto:", file);
    setAttachedFile({ ...file, name: file.name });
    setMessage({ ...message, hasAttachment: true, preview: file.name });
  };

  return (
    <div
    className="fixed z-50 inset-0 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    {/* Backdrop oscuro - debe estar FUERA del form y con z-index menor */}
    {/* <div
      className="fixed inset-0 bg-gray-100 bg-opacity-10 transition-opacity animate-in fade-in duration-300"
      aria-hidden="true"
      onClick={onClose} // Cerrar al hacer clic en el fondo
    ></div> */}

    <form onSubmit={handleSend} className="relative z-10">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6 animate-in zoom-in-95 duration-300">
            <div>
              <div>
                <button
                  onClick={onClose}
                  className="flex ml-auto"
                  aria-label="Cerrar ventana"
                  title="Cerrar ventana"
                >
                  <X
                    size={22}
                    className="text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
                  />
                </button>
              </div>
              <div className="flex text-center items-center justify-center space-x-2">
                <div className="text-center items-center flex h-12 w-12 justify-center rounded-full bg-green-100">
                  <Send size={24} className="text-green-500" />
                </div>
                <div>
                  <p className="font-semibold text-xl">Nuevo mensaje</p>
                </div>
              </div>
              <div>
                <label
                  htmlFor="addressee"
                  className="block text-sm text-gray-700 font-bold"
                >
                  Para:
                </label>
                <Input
                  type="text"
                  placeholder="Nombre del usuario"
                  value={recipientUsername}
                  onChange={(e) => setRecipientUsername(e.target.value)}
                  className={"mt-1 block w-full sm:text-sm shadow-sm"}
                />
              </div>
              <div className="sm:mt-5">
                <label
                  className="block text-sm text-black font-bold"
                  htmlFor="message"
                >
                  Mensaje:
                </label>
                <textarea
                  placeholder={placeholder}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-2 block w-full h-32 rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm resize-none"
                />
              </div>
              <div>
                <Button
                  variant="outline"
                  type="button"
                  className="w-8 h-8 rounded-md text-gray-700 font-bold border-2 border-gray-300 hover:border-gray-400 active:border-gray-400"
                >
                  <Paperclip size={16} className="shrink-0 " />
                  <input type="file" name="document" id="document" className="" onChange={handleAttachment} />
                </Button>
              </div>
            </div>

            {/* Visualizar archivo adjunto */}
            {message.hasAttachment && (
              <div className="w-full mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-3 bg-gray-100 p-4 rounded-md border-1 border-gray-300">
                <div className="flex-1 flex flex-col">
                  <div className="flex items-center justify-center">
                    <Paperclip size={16} className="shrink-0 text-gray-600 mr-1" />
                    <p className="text-sm text-gray-600">
                      Archivo adjunto
                    </p>
                  </div>
                  <div className="mt-2 grid items-center justify-center">
                    <p className="text-sm text-gray-800">
                      {message.preview}
                    </p>
                    <p className="text-center">
                      {/* TODO: mostrar tamaño del archivo */}
                      <span className="text-xs text-gray-500">
                         MB
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-3">
              <Button
                variant="primary"
                type="submit"
                onClick={() => handleSend()}
              >
                Enviar <SendHorizonal size={16} className="text-white ml-2" />
              </Button>
              <Button variant="secondary" onClick={onClose}>
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
