import {Image} from '@shopify/hydrogen';

export default function CleanSupplements({collection}: {collection: any}) {
  if (!collection) return null;

  return (
    <div className="clean-supplements p-4">
      <h2 className="text-2xl font-bold mb-4">{collection.title}</h2>
      <div className="flex space-x-6 overflow-x-auto">
        {collection.products.nodes.map((product: any) => (
          <div
            key={product.id}
            className="product-card flex-shrink-0 w-64 border rounded-lg p-4 shadow-sm"
          >
            <div className="relative">
              <Image
                data={product.images.nodes[0]}
                alt={product.images.nodes[0]?.altText || product.title}
                className="object-contain"
                style={{
                  width: `${product.images.nodes[0].width}px`,
                  height: `${product.images.nodes[0].height}px`,
                }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"

              />
            </div>
            <h3 className="text-lg font-semibold mt-4">{product.title}</h3>
            <p className="text-gray-600 text-sm mt-2">{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
