import React from 'react';
import {Image} from '@shopify/hydrogen';

export default function DoctorRecommended({collection}) {
  if (!collection || !collection.products) return null;

  return (
    <div className="w-full flex items-center justify-between bg-gray-100 p-6">
      {/* Sección izquierda con el botón y las estrellas */}
      <div className="mr-6">
        <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600">
          Doctor Recommended
        </button>
        <div className="mt-2 flex items-center">
          {/* Renderizado de estrellas */}
          <div className="flex text-yellow-500">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-5 h-5"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          </div>
          {/* Texto de reseñas */}
          <span className="ml-2 text-gray-700 font-medium">
            12000+ 5-star reviews
          </span>
        </div>
      </div>

      {/* Imágenes de la colección a la derecha */}
      <div className="flex flex-wrap gap-4">
        {collection.products.nodes.map((product) => (
          <div key={product.id} className="w-24">
            <Image
              data={product.images.nodes[0]}
              alt={product.title}
              className="w-full rounded-md shadow"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"

            />
          </div>
        ))}
      </div>
    </div>
  );
}
