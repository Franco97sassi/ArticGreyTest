 
import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link, type MetaFunction} from '@remix-run/react';
import {Suspense} from 'react';
import {Image, Money} from '@shopify/hydrogen';
 import type {
  FeaturedCollectionFragment,
  RecommendedProductsQuery,
} from 'storefrontapi.generated';
import StartWithYourGoals from '../components/StartWithYourGoals';
import SupplementsCollection from '../components/Supplements'; // Importar el componente
import FollowCollection from '../components/FollowCollection'; // Importar el componente
import InitialVideo from '../components/InitialVideo';
import DoctorRecommended from '../components/DoctorRecommended';
import CleanSupplements from '../components/CleanSupplements';
import RealPeople from '../components/RealPeople'; 
import BundlesCollection from '../components/Bundles';
import CustomizedProteinPowder from '../components/CustomizedProteinPowder';

export const meta: MetaFunction = () => { 
  return [{title: 'Hydrogen | Home'}];
};

export async function loader(args: LoaderFunctionArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return defer({...deferredData, ...criticalData});
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({context}: LoaderFunctionArgs) {
  const [
    // {product: videoInicial},
    // {collections},
    {collection: realPeopleCollection},

      {collection: startWithYourGoalsCollection},
    {collection: supplementsCollection},
    {collection: followCollection},
    {collection: brandsCollection},
 
    {collection: cleanSupplementsCollection},
    // {collection: bundlesCollection},
  ] = await Promise.all([
    // context.storefront.query(FEATURED_COLLECTION_QUERY),
    context.storefront.query(REAL_PEOPLE_COLLECTION_QUERY, {
      variables: {handle: 'real-people-real-results'},
    }),
    context.storefront.query(START_WITH_YOUR_GOALS_QUERY, {
      variables: {handle: 'start-with-your-goals'},
    }),
    context.storefront.query(SUPPLEMENTS_COLLECTION_QUERY, {
      variables: {handle: 'supplements'},
    }),
    context.storefront.query(FOLLOW_COLLECTION_QUERY, {
      variables: {handle: 'follow'},
    }),
    context.storefront.query(BRANDS_COLLECTION_QUERY, {
      variables: {handle: 'brands'},
    }),
    
    context.storefront.query(CLEAN_SUPPLEMENTS_QUERY, {
      variables: {handle: 'clean-supplements-made-for-you'},
    }),
  ]);

  return {
    realPeopleCollection,

    // featuredCollection: collections.nodes[0],
    startWithYourGoals: startWithYourGoalsCollection,
    supplementsCollection,
    followCollection,
    brandsCollection,
    cleanSupplements: cleanSupplementsCollection,
    // bundlesCollection,
  };
}


/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: LoaderFunctionArgs) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
  };
}

export default function Homepage() {
  const data = useLoaderData<typeof loader>();
 
  return (
    <div className="home">
      {/* <FeaturedCollection collection={data.featuredCollection} />
      <RecommendedProducts products={data.recommendedProducts} /> */}
            <RealPeople  collection={data.realPeopleCollection}  /> 

        {/* <InitialVideo />    */}
       
      <DoctorRecommended collection={data.brandsCollection} />  

        <StartWithYourGoals collection={data.startWithYourGoals} />  
       <SupplementsCollection collection={data.supplementsCollection} />  
        <CleanSupplements collection={data.cleanSupplements} />
         <BundlesCollection collection={data.BundlesCollection} />  
        <FollowCollection collection={data.followCollection} />   
      <CustomizedProteinPowder/>
    </div>
  );
}

function FeaturedCollection({
  collection,
}: {
  collection: FeaturedCollectionFragment;
}) {
  if (!collection) return null;
  const image = collection?.image;
  return (
    <Link
      className="featured-collection"
      to={`/collections/${collection.handle}`}
    >
      {image && (
        <div className="featured-collection-image">
          <Image data={image} sizes="100vw" />
        </div>
      )}
      <h1>{collection.title}</h1>
    </Link>
  );
}

function RecommendedProducts({
  products,
}: {
  products: Promise<RecommendedProductsQuery | null>;
}) {
  return (
    <div className="recommended-products">
      <h2>Recommended Products</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {(response) => (
            <div className="recommended-products-grid">
              {response
                ? response.products.nodes.map((product) => (
                    <Link
                      key={product.id}
                      className="recommended-product"
                      to={`/products/${product.handle}`}
                    >
                      <Image
                        data={product.images.nodes[0]}
                        aspectRatio="1/1"
                        sizes="(min-width: 45em) 20vw, 50vw"
                      />
                      <h4>{product.title}</h4>
                      <small>
                        <Money data={product.priceRange.minVariantPrice} />
                      </small>
                    </Link>
                  ))
                : null}
            </div>
          )}
        </Await>
      </Suspense>
      <br />
    </div>
  );
}
 
 
const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
` as const;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 1) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
` as const;

const START_WITH_YOUR_GOALS_QUERY = `#graphql
  query StartWithYourGoals($handle: String!) {
    collection(handle: $handle) {
      id
      title
      products(first: 8) {
        nodes {
          id
          title
          description
          handle
          images(first: 1) {
            nodes {
              url
              altText
            }
          }
        }
      }
    }
  }
` as const;
const SUPPLEMENTS_COLLECTION_QUERY = `#graphql
  query SupplementsCollection($handle: String!) {
    collection(handle: $handle) {
      id
      title
      products(first: 10) {
        nodes {
          id
          title
          description
          handle
          images(first: 1) {
            nodes {
              url
              altText
            }
          }
          variants(first: 5) {
            nodes {
              id
              title
              priceV2 {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  }
` as const;

 




// const SUPPLEMENTS_COLLECTION_QUERY = `#graphql
//   fragment SupplementsCollection on Collection {
//     id
//     title
//     description
//     image {
//       id
//       url
//       altText
//       width
//       height
//     }
//     handle
//   }
//   query SupplementsCollection($country: CountryCode, $language: LanguageCode, $handle: String!) 
//     @inContext(country: $country, language: $language) {
//     collection(handle: $handle) {
//       ...SupplementsCollection
//     }
//   }
// ` as const;
const REAL_PEOPLE_COLLECTION_QUERY = `#graphql
  query RealPeopleCollection($handle: String!) {
    collection(handle: $handle) {
      id
      handle
      title
      image {
      id
      url
    }
      products(first: 10) {
        nodes {
          id
          title
          description
          handle
          images(first: 1) {
            nodes {
              url
              altText
            }
          }
            images(first: 1) {
            nodes {
              url
              altText
            }
          }
          variants(first: 1) {
            nodes {
              id
              title
              priceV2 {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  }
    
` as const;




const FOLLOW_COLLECTION_QUERY = `#graphql
  query FollowCollection($handle: String!) {
    collection(handle: $handle) {
      id
      title
      products(first: 10) {
        nodes {
          id
          title
          handle
          images(first: 1) {
            nodes {
              url
              altText
            }
          }
        }
      }
    }
  }
` as const;

const BRANDS_COLLECTION_QUERY = `#graphql
  query BrandsCollection($handle: String!) {
    collection(handle: $handle) {
      id
      title
      products(first: 8) {
        nodes {
          id
          title
          images(first: 1) {
            nodes {
              url
              altText
            }
          }
        }
      }
    }
  }
` as const;


const CLEAN_SUPPLEMENTS_QUERY = `#graphql
  query CleanSupplementsCollection($handle: String!) {
    collection(handle: $handle) {
      id
      title
      products(first: 8) {
        nodes {
          id
          title
          description
          handle
          images(first: 1) {
            nodes {
              url
              altText
            }
          }
        }
      }
    }
  }
` as const;

// const BUNDLES_COLLECTION_QUERY = `#graphql
//   query BundlesCollection($handle: String!) {
//     collection(handle: $handle) {
//       id
//       title
//       products(first: 8) {
//         nodes {
//           id
//           title
//           description
//           handle
//           images(first: 1) {
//             nodes {
//               url
//               altText
//             }
//           }
//           variants(first: 5) {
//             nodes {
//               id
//               title
//               priceV2 {
//                 amount
//                 currencyCode
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// ` as const;
