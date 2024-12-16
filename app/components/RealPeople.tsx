// RealPeople.tsx

import { Link } from '@remix-run/react';
import { Image, Money } from '@shopify/hydrogen';

const RealPeople = ({ collection }: { collection: any }) => {
  if (!collection || !collection.products || collection.products.nodes.length === 0) {
    return <div>No products available in this collection.</div>;
  }

  return (
    <div className="real-people-collection">
      <h2>{collection.title}</h2>
      <div className="products-grid">
        {collection.products.nodes.map((product: any) => (
          <Link
            key={product.id}
            className="product-card"
            to={`/products/${product.handle}`}
          >
            {product.images.nodes[0] && (
              <Image
                data={product.images.nodes[0]}
                altText={product.images.nodes[0].altText}
                aspectRatio="1/1"
                sizes="(min-width: 45em) 20vw, 50vw"
              />
            )}
            <h3>{product.title}</h3>
            {product.priceRange && product.priceRange.minVariantPrice && (
              <small>
                <Money data={product.priceRange.minVariantPrice} />
              </small>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RealPeople;
