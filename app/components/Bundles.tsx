import { Link } from '@remix-run/react';
import { Image, Money } from '@shopify/hydrogen';

// Definir los tipos de los productos y variantes
interface ProductVariant {
  id: string;
  title: string;
  priceV2: { amount: string; currencyCode: string };
}

interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  images: { nodes: { url: string; altText: string }[] };
  variants: { nodes: ProductVariant[] };
}

interface Collection {
  description: string;
  products: { nodes: Product[] };
}

export default function BundlesCollection({ collection }: { collection: Collection }) {
  if (!collection) return null;

  return (
    <div className="start-with-your-goals mt-8">
      {/* Mostrar descripción solo si está disponible */}
      {collection.description && (
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {collection.description}
        </h2>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {collection.products.nodes.map((product: Product) => (
          <Link
            key={product.id}
            to={`/products/${product.handle}`}
            className="group block border rounded-lg p-4 hover:shadow-lg transition"
          >
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-100">
              <Image
                src={product.images.nodes[0]?.url}
                alt={product.images.nodes[0]?.altText || 'Product image'}
                className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform"
              />
            </div>

            <h4 className="mt-4 text-lg font-medium text-gray-900 group-hover:text-blue-600">
              {product.title}
            </h4>

            {/* Mostrar descripción solo si existe */}
            {product.description && (
              <p className="mt-4 text-md text-gray-600">{product.description}</p>
            )}

            {/* Mostrar variantes de producto con sus respectivos precios */}
            {product.variants.nodes.length > 0 && (
              <div className="mt-4">
                <h5 className="text-md font-bold text-gray-800">Variants:</h5>
                <div className="flex flex-wrap gap-2">
                  {product.variants.nodes.map((variant: ProductVariant) => (
                    <div
                      key={variant.id}
                      className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md cursor-not-allowed"
                    >
                      <span className="font-medium">{variant.title}</span> - 
                      <Money data={variant.priceV2} /> {/* Mostrar el precio de cada variante */}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Estrellas y botón */}
            <div className="mt-4 flex items-center justify-between">
              <div className="flex text-white">
                {/* Estrellas en color blanco */}
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className="w-5 h-5 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 17.27L18.18 21 15.54 13.97 21 9.24l-6.91-.61L12 2 9.91 8.63 3 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <div className="mt-4 text-right">
                <button className="bg-black text-white py-2 px-4 rounded-full hover:bg-gray-800 transition">
                  Add {product.variants.nodes[0]?.priceV2.amount} {product.variants.nodes[0]?.currencyCode}
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
