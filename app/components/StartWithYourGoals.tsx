import {Link} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';

export default function StartWithYourGoals({collection}: {collection: any}) {
  if (!collection) return null;

  return (
    <div className="start-with-your-goals mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{collection.title}</h2>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{collection.description}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {collection.products.nodes.map((product: any) => (
          <Link
            key={product.id}
            to={`/products/${product.handle}`}
            className="group block border rounded-lg p-4 hover:shadow-lg transition"
          >
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-100">
              <img
                src={product.images.nodes[0]?.url}
                alt={product.images.nodes[0]?.altText || 'Product image'}
                className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform"
              />
            </div>
            <h4 className="mt-4 text-lg font-medium text-gray-900 group-hover:text-blue-600">
              {product.title}
            </h4>
            <h4 className="mt-4 text-lg font-medium text-gray-900 group-hover:text-blue-600">
              {product.description}
            </h4>
          </Link>
        ))}
      </div>
    </div>
  );
}
