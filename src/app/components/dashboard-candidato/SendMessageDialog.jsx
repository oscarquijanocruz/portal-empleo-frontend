// Dialogo de envio de mensaje
"use client";
import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import Textarea from "@/app/components/ui/Textarea";
import { FileIcon, Paperclip, Send, SendHorizonal, X, XCircle } from "lucide-react";
import { useNotification } from "@/app/contexts/NotificationContext";
import { useForm } from "react-hook-form";

export default function SendMessageDialog({
  isOpen = false,
  onClose = () => {},
  onSend = () => {},
  placeholder = "Escribe tu mensaje...",
}) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      recipientUsername: "",
      message: "",
      attachedFile: null,
      timestamp: new Date().toISOString(),
    },
  });
  const { notify } = useNotification();

  // watch(); para observar el archivo adjunto en tiempo real
  const attachedFile = watch("attachedFile")?.[0];
  
  // Funcion que se ejecuta el form es válido
  const onSubmit = async (data) => {  
    
    const messageData = {
      to: data.recipientUsername,
      text: data.message,
      attachedFile: data.attachedFile?.[0] || null, // attachedFile es FileList, tomamos el primer archivo
      timestamp: new Date().toISOString()
    };

    // Llamar al padre
    onSend?.(messageData);

    // ✅ Ejemplo de integración con API usando FormData
    // const formData = new FormData();
    // formData.append('to', data.recipientUsername);
    // formData.append('text', data.messageText);
    // if (data.file?.[0]) {
    //   formData.append('file', data.file[0]);
    // }
    //
    // try {
    //   const response = await fetch('/api/messages/send', {
    //     method: 'POST',
    //     body: formData
    //   });
    //   const result = await response.json();
    //   window.location.href = `/messages/${result.conversationId}`;
    // } catch (error) {
    //   console.error('Error:', error);
    //   alert('Error enviando mensaje');
    //   return; // No cerrar el modal si hay error
    // }

  // const fileInputRef = useRef(null);
  // const handleSubmit = (e) => {
  //   e.preventDefault(); // Prevenir recarga de la pagina

  //   // Preparar datos para enviar
  //   const messageData = {
  //     to: recipientUsername,
  //     text: message,
  //     file: attachedFile,
  //     timestamp: new Date().toISOString()
  //   };

  //   // Reset del formulario
  //   setMessage("");
  //   setAttachedFile(null);
  //   setRecipientUsername("");

  //   // onSend?.(message, recipientUsername, attachedFile?.name);
  //   // onSend?.(messageData);
  //   onClose();
  //   // Mandar mensaje a la API
  //   // fetch('/api/messages/send', { ... })
  //   //   .then(response => response.json())
  //   //   .then(data => {
  //   //     console.log('Mensaje enviado:', data);
  //   //     onClose();
  //   //   })
  //   //   .catch(error => {
  //   //     console.error('Error enviando mensaje:', error);
  //   //   });

  //   // Redireccionar a la nueva conversación
  //   // window.location.href = `/messages/${data.id}`;   

  //   // Si ya existe la conversación, redirigir a ella
  //   // const conversationId = data.conversationId;
  //   // if (conversationId) {
  //   //   window.location.href = `/messages/${conversationId}`;
  //   // }

  //   // Si no existe la conversación, redirigir a la lista de conversaciones
  //   // window.location.href = '/messages';
  // };
    
    reset(
      {
        recipientUsername: watch(""),
        message: watch(""),
        attachedFile: null,
      }
    );
    onClose();
  };

  const handleAttachment = (e) => {
    e.preventDefault() ; // Evita el comportamiento por defecto
    const file = e.target.files?.[0];
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (!file) return;

    if (file.size > maxSize) {
      notify.error("El archivo es demasiado grande. El tamaño máximo es de 10MB.");
      e.target.value = "";
      return;
    }
  };

  // remover archivo adjunto
  const removeAttachment = () => {
    reset({
      recipientUsername: watch("recipientUsername"),
      message: watch("message"),
      attachedFile: null,
    });
  };

  // Early return si el dialogo no está abierto
  if (!isOpen) return null;

  return (
    <div
      className="fixed z-50 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop oscuro */}
      <div
        className="fixed -z-10 inset-0 bg-black backdrop-opacity-70 opacity-50 transition-opacity animate-in fade-in duration-300"
        aria-hidden="true"
        role="dialog"
        onClick={onClose} // Cerrar al hacer clic en el fondo
      ></div>

      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg border-1 px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6 animate-in zoom-in-95 duration-300">
          <form onSubmit={handleSubmit(onSubmit)} className="relative z-10">
            <div>
              <div>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex ml-auto"
                  aria-label="Cerrar ventana"
                  title="Cerrar ventana"
                >
                  <X
                    size={22}
                    className="text-gray-400 hover:text-gray-800 transition-colors cursor-pointer"
                  />
                </button>
              </div>
              <div className="flex text-center items-center justify-center space-x-2 pb-4">
                <div className="text-center items-center flex h-12 w-12 justify-center rounded-full bg-blue-100">
                  <Send size={24} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-xl">Nuevo mensaje</p>
                </div>
              </div>
              <div>
                <label
                  htmlFor="recipientUsername"
                  className="block text-sm text-gray-700 font-bold"
                >
                  Para:
                </label>
                <Input
                  id="recipientUsername"
                  name="recipientUsername"
                  type="text"
                  placeholder="Nombre del usuario"
                  className={"mt-1 block w-full sm:text-sm shadow-sm"}
                  {...register("recipientUsername", {
                    required: "Nombre del destinatario es obligatorio",
                    maxLength: {
                      value: 50,
                      message: "Máximo 50 caracteres",
                    },
                  })}
                  error={errors.recipientUsername?.message}
                />
              </div>
              <div className="sm:mt-5">
                <label
                  className="block text-sm text-black font-bold"
                  htmlFor="message"
                >
                  Mensaje:
                </label>
                <Textarea
                  id="message"
                  name="message"
                  size="sm"
                  placeholder={placeholder}
                  {...register("message", {
                    required: true,
                    minLength: {
                      value: 1,
                      message: "El mensaje no puede estar vacío",
                    },
                    maxLength: {
                      value: 500,
                      message: "Máximo 500 caracteres",
                    },
                  })}
                  error={errors.message?.message}
                  className="mt-2 block h-32 rounded-md shadow-sm resize-none"
                />
              </div>
              <div>
                <label
                  htmlFor="file-input"
                  aria-label="Adjuntar archivo"
                  title="Adjuntar archivo"
                >
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() =>
                      document.getElementById("file-input").click()
                    }
                    className="w-8 h-8 rounded-md text-gray-700 font-bold border-2 border-gray-300 hover:border-gray-400 active:border-gray-400 "
                  >
                    <Paperclip size={16} className="shrink-0" />
                  </Button>
                </label>
                <input
                  id="file-input"
                  type="file"
                  className="hidden"
                  {...register("attachedFile", {
                    required: false,
                    validate: {
                      fileSize: (files) => {
                        if (!files?.[0]) return true; // Si no hay archivo, es válido
                        const maxSize = 5 * 1024 * 1024; // 5MB
                        return (
                          files[0].size <= maxSize ||
                          "El archivo debe ser menor a 5MB"
                        );
                      },
                    },
                  })}
                  accept=".pdf,.doc,.docx,.txt,image/*"
                />
                {errors.file?.message && (
                  <p className="text-red-600 text-sm">{errors.file?.message}</p>
                )}
              </div>
            </div>

            {/* Visualizar archivo adjunto */}
            {attachedFile && (
              <div className="w-full mt-5 sm:mt-4 sm:flex sm:flex-row-reverse py-2 gap-3 border-t-1 border-gray-300">
                <div className="flex-1 flex flex-col items-center">
                  <div className="flex items-center justify-center pt-1">
                    <Paperclip
                      size={16}
                      className="shrink-0 text-gray-600 mr-1"
                    />
                    <p className="text-sm text-gray-600">1 Archivo adjunto</p>
                  </div>
                  <div className="relative">
                    <Button
                      onClick={removeAttachment}
                      variant="outline"
                      size="xs"
                      className={'absolute px-1 py-1 left-10'}
                    >
                      <XCircle
                        size={18}
                        className="text-gray-100 hover:text-red-600 transition-colors cursor-pointer"
                        fill="bg-gray-700 hover:bg-red-400 active:bg-red-500 "
                      />  
                    </Button>
                    <FileIcon
                      size={55}
                      className="shrink-0 text-gray-500 stroke-1 my-1"
                    />
                  </div>
                  <div className="mt-2 grid items-center justify-center">
                    <p className="text-xs text-gray-700">{attachedFile.name}</p>
                    <p className="text-center">
                      <span className="text-xs text-gray-500">
                        {(attachedFile.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-4 sm:mt-4 sm:flex sm:flex-row-reverse gap-3">
              <Button
                size="sm"
                variant="primary"
                type="submit"
                disabled={isSubmitting}
                className={"cursor-pointer"}
              >
                {isSubmitting ? "Enviando..." : "Enviar"}
                <SendHorizonal size={16} className="text-white ml-2" />
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={onClose}
                className={"cursor-pointer"}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
