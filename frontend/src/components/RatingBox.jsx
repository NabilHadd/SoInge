// src/components/ReseñasBox.js
import React from 'react';
import { Star } from 'lucide-react'; // para los íconos de estrellas

export default function RatingBox({ reviewsNum, stars, reviews }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex flex-col gap-4">
      {/* Encabezado con estrellas y cantidad */}
      <div className="flex items-center gap-2 text-gray-700">
        {/* Estrellas */}
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={20}
              className={i < Math.round(stars) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
            />
          ))}
        </div>
        <span className="text-sm text-gray-500">({reviewsNum} reseñas)</span>
      </div>

      {/* Lista de reseñas */}
      <div className="flex flex-col gap-3 mt-3">
        {reviews.length > 0 ? (
          reviews.map((r, i) => (
            r !== '' && (
            <div
              key={i}
              className="bg-[#F9FAFB] border border-gray-200 rounded-xl p-3 text-gray-700 shadow-sm"
            >
              {r}
            </div>
            )
          ))
        ) : (
          <p className="text-gray-500 italic">Aún no hay reseñas.</p>
        )}
      </div>

      
    </div>
  );
}
