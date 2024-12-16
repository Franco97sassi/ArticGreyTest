import React from 'react';
import customizedIcon from "/images/customizedIcon.png"; 
import customizedIconWhite from "/images/customizedIconWhite.png"; 

const CustomizedProteinPowder = () => {
  return (
    <div className="flex">
      {/* Columna izquierda con fondo blanco */}
      <div className="w-1/2 bg-white p-8">
        <h2 className="text-black text-3xl font-semibold">Personalized Protein Powder</h2>
        <p className="text-gray-700 mt-4">Here you can customize your protein powder based on your needs.</p>
        {/* Agregar más contenido aquí según sea necesario */}
      </div>

      {/* Columna derecha con fondo negro */}
      <div className="w-1/2 bg-black p-8">
        <h2 className="text-white text-3xl font-semibold">The Blend</h2>
        {/* Colocamos los párrafos dentro de un contenedor flex */}
        <div className="flex space-x-4 mt-4">
          <p className="text-gray-300">Choose the.</p>
          <p className="text-gray-300">Choose the.</p>
          <p className="text-gray-300">Choose the.</p>
        </div>
      </div>
              {/* seg2 */}

      <div className="w-1/2 bg-black p-8">
        <h2 className="text-white text-3xl font-semibold">The Blend</h2>
        {/* Colocamos los párrafos dentro de un contenedor flex */}
        <div className="flex space-x-4 mt-4">
          <p className="text-gray-300">Choose the.</p>
          <p className="text-gray-300">Choose the.</p>
          <p className="text-gray-300">Choose the.</p>
        </div>
      </div>
    </div>
  );
};

export default CustomizedProteinPowder;
