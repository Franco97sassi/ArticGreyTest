import { Link } from '@remix-run/react';
import { Image } from '@shopify/hydrogen';
import arrow from "/arrow.png"; 

export default function StartWithYourGoals({ collection }: { collection: any }) {
  if (!collection) return null;

  return (
    <div className="start-with-your-goals mt-8">
      
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">{collection.title}</h2>
      <p className="text-lg text-center text-gray-600 mb-6">{collection.description}</p>
      <p className="text-lg text-center text-gray-600 mb-6"> COMFORTABLY UNCOMFORTABLE </p>

      <p className="text-lg text-center text-gray-600 mb-6">We cannot become what we want to be by remaining what we are.</p>

      {/* Grilla para los productos, todos en una fila */}
      <div className="flex overflow-x-auto space-x-4 pb-6">
        {/* {collection.products.nodes.map((product: any) => (
          <Link
            key={product.id}
            to={`/products/${product.handle}`}
            className="group block border rounded-lg p-4 hover:shadow-lg transition"
          >
            <div className="aspect-w-1 aspect-h-1 w-64 overflow-hidden rounded-md bg-gray-100">
              <Image
                src={product.images.nodes[0]?.url}
                alt={product.images.nodes[0]?.altText || 'Product image'}
                width={256} // Asegúrate de establecer un tamaño adecuado para la imagen
                height={256} // Asegúrate de establecer un tamaño adecuado para la imagen
                className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform"
              />
            </div>
            <h4 className="mt-4 text-lg font-medium text-gray-900 group-hover:text-blue-600">
              {product.title}
            </h4>
            <div className="flex items-center mt-4 text-lg font-medium text-gray-900 group-hover:text-blue-600">
              <p>{product.description}</p>
              <div className="ml-2 flex items-center justify-center w-8 h-8 rounded-full bg-white border border-gray-600">
                <img src={arrow} alt="Arrow" className="w-4 h-4 text-gray-600" />
              </div>
            </div>
          </Link>
        ))} */}
      </div>
    </div>
  );
}
