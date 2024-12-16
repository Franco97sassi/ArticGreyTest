import { Image } from '@shopify/hydrogen';  // Importar Image desde Shopify Hydrogen

function FollowCollection({
  collection,
}: {
  collection: {
    title: string;
    products: {
      nodes: {
        id: string;
        images: {
          nodes: {
            url: string;
            altText: string;
          }[]; 
        };
      }[]; 
    };
  };
}) {
  if (!collection || !collection.products.nodes.length) return null;

  return (
    <div className="mt-8">
      {/* <h2 className="text-center text-2xl font-semibold mb-4">{collection.title}</h2> */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Caja con el fondo gris que ocupa el doble de ancho */}
        <div className="gray bg-gray-300 col-span-2 p-4 flex flex-col items-center justify-center space-y-2">
          <div>
            Logo @uncmfrt.com
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Follow Us on Instagram
          </button>
        </div>

        {/* Productos */}
        {collection.products.nodes.map((product) => (
          <div key={product.id} className="flex justify-center items-center overflow-hidden rounded-lg shadow-lg">
            {product.images.nodes[0] && (
              <Image
                data={product.images.nodes[0]}  // Usar la primera imagen del producto
                alt={product.images.nodes[0].altText || 'Product Image'}  // Agregar un altText adecuado
                aspectRatio="1/1"  // Relación de aspecto cuadrada
                sizes="(min-width: 45em) 20vw, 50vw"  // Ajuste de tamaño de imagen para diferentes resoluciones
                className="object-cover w-full h-full"  // Asegura que la imagen ocupe el espacio completo del contenedor
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FollowCollection;
