"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Semana 1", ingresos: 400 },
  { name: "Semana 2", ingresos: 600 },
  { name: "Semana 3", ingresos: 800 },
  { name: "Semana 4", ingresos: 500 },
];

export default function Reports() {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 col-span-1">
<h2 className="text-sm font-semibold mb-2 bg-blue-50 text-black text-center p-1 rounded-md">
  Ingresos
</h2>
      <div className="h-47">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="name" fontSize={10} stroke="#9CA3AF" />
            <YAxis fontSize={10} stroke="#9CA3AF" />
            <Tooltip />
            <Line type="monotone" dataKey="ingresos" stroke="#bb0c0cff" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
