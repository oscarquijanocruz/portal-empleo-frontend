"use client";
import { useState } from "react";

const criterios = [
  {
    titulo: "Apariencia personal",
    opciones: [
      "Mala descuidada",
      "Algo descuidada en el vestir y apariencia general",
      "En general limpio y de buena apariencia",
      "Muy cuidadoso en su aspecto",
      "Impecable en el vestir, persona elegante",
    ],
  },
  {
    titulo: "Forma de expresión",
    opciones: [
      "Confuso, no se explica bien",
      "Expresión pobre, algo disperso",
      "Se da a entender sin gran fluidez",
      "Buena expresión lógica, clara",
      "Habilidad para expresarse, dinámico y convincente",
    ],
  },
  {
    titulo: "Educación",
    opciones: [
      "Falta de entrenamiento básico para el puesto",
      "No posee la educación necesaria, puede mejorar",
      "Posee la educación necesaria para el puesto",
      "Posee los conocimientos necesarios y los mejora",
      "Conocimientos excepcionales para el puesto",
    ],
  },
  {
    titulo: "Interés ocupacional",
    opciones: [
      "No tiene interés definido",
      "Tiene poco interés por determinada actividad",
      "Desea trabajar en un puesto acorde a su experiencia",
      "Hace hincapié en colocarse según sus conocimientos",
      "Define claramente lo que prefiere según su especialidad",
    ],
  },
  {
    titulo: "Experiencia",
    opciones: [
      "No tiene experiencia",
      "Experiencia mínima",
      "Tiene cierta experiencia",
      "Se ha dedicado a un mismo trabajo",
      "Es un verdadero especialista",
    ],
  },
  {
    titulo: "Estabilidad laboral",
    opciones: [
      "Cambios constantes sin motivo aparente",
      "Cambios frecuentes por ofertas inseguras",
      "Ha cambiado para mejorar",
      "Permanencia promedio de 2 años",
      "Permanencia mayor a 3 años por crecimiento",
    ],
  },
  {
    titulo: "Actitud en entrevista",
    opciones: [
      "Retraído, asocial",
      "Un poco tímido y reservado",
      "Proporciona datos necesarios",
      "Amistoso, facilidad para socializar",
      "Sociable, genera confianza inmediata",
    ],
  },
  {
    titulo: "Potencial",
    opciones: [
      "Bajo, no se esfuerza",
      "Regular, desea progresar con poco esfuerzo",
      "Bueno, quiere progresar y se esfuerza",
      "Superior, fuertes aspiraciones",
      "Excelente, busca superación constante",
    ],
  },
];

export default function EvaluacionTab() {
  const [evaluacion, setEvaluacion] = useState({});

  const seleccionar = (criterio, opcion) => {
    setEvaluacion({ ...evaluacion, [criterio]: opcion });
  };

  return (
    <div className="space-y-6">
      {criterios.map((item) => (
        <div key={item.titulo} className="bg-gray-50 p-4 rounded-xl border">
          <h3 className="font-semibold text-lg mb-3 text-gray-700">
            {item.titulo}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {item.opciones.map((opcion) => (
              <button
                key={opcion}
                onClick={() => seleccionar(item.titulo, opcion)}
                className={`p-3 rounded-lg border text-left text-sm transition
                  ${
                    evaluacion[item.titulo] === opcion
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white hover:bg-blue-50"
                  }`}
              >
                {opcion}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
