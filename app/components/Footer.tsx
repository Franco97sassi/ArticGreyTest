import { Suspense } from 'react';
import { Await } from '@remix-run/react';
import type { FooterQuery, HeaderQuery } from 'storefrontapi.generated';

interface FooterProps {
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  publicStoreDomain: string;
}

export function Footer({
  footer: footerPromise,
  header,
  publicStoreDomain,
}: FooterProps) {
  return (
    <Suspense>
      <Await resolve={footerPromise}>
        {(footer) => (
          <footer className="bg-gray-900 text-white py-8">
            {footer?.menu && header.shop.primaryDomain?.url && (
              <FooterMenu
                menu={footer.menu}
                primaryDomainUrl={header.shop.primaryDomain.url}
                publicStoreDomain={publicStoreDomain}
              />
            )}
          </footer>
        )}
      </Await>
    </Suspense>
  );
}

function FooterMenu({
  menu,
  primaryDomainUrl,
  publicStoreDomain,
}: {
  menu: FooterQuery['menu'];
  primaryDomainUrl: FooterProps['header']['shop']['primaryDomain']['url'];
  publicStoreDomain: string;
}) {
  const sections = [
    {
      title: 'About',
      links: ['Blog', 'Product Reviews', 'Our Story', 'Delivery'],
    },
    {
      title: 'Support',
      links: ['Order Status', 'Help Center', 'Contact Us', 'Resume'],
    },
    {
      title: 'Important Links',
      links: ['Maintenance', 'Warranty', 'Canadian Customers', 'Setup'],
    },
    {
      title: 'Legal',
      links: [
        'Privacy Policy',
        'Accessibility',
        'Terms of Service',
        'Affiliate Program',
      ],
    },
    {
      title: 'Contact Us',
      links: ['Let Us Help You', '(888) 860-0572', 'Connect With Us'],
    },
  ];

  return (
    <nav className="container mx-auto flex flex-wrap gap-6 justify-between border-t border-gray-600 pt-6">
      {/* Email Subscription Section */}
      <div className="flex-1 min-w-[200px]">
        <h3 className="text-lg font-bold text-white mb-2">
          Be a part of our journey
        </h3>
        <p className="text-gray-400 mb-4">
          Welcome to UNCMFRT. Sign up for exclusive content and we'll send you
          10% off.
        </p>
        <div className="flex items-center space-x-2">
          <input
            type="email"
            placeholder="Email Address"
            className="px-3 py-2 w-full text-gray-900 rounded-md"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Subscribe
          </button>
        </div>
      </div>

      {/* Dynamic Sections */}
      {sections.map((section, idx) => (
        <div key={idx} className="flex-1 min-w-[200px]">
          <h3 className="text-lg font-bold text-white mb-2">{section.title}</h3>
          <ul className="space-y-2 text-gray-400">
            {section.links.map((link, index) => (
              <li key={index} className="hover:text-white">
                {link}
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* Footer line and information */}
      <div className="flex justify-between w-full mt-4">
        <div className="text-gray-400">
          © uncmfrt.com. All rights reserved.
        </div>
        <div className="text-gray-400">
          Made with by Arctic Grey
        </div>
      </div>
    </nav>
  );
}

const FALLBACK_FOOTER_MENU = {
  id: 'gid://shopify/Menu/199655620664',
  items: [
    {
      id: 'gid://shopify/MenuItem/461633060920',
      resourceId: 'gid://shopify/ShopPolicy/23358046264',
      tags: [],
      title: 'Privacy Policy',
      type: 'SHOP_POLICY',
      url: '/policies/privacy-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633093688',
      resourceId: 'gid://shopify/ShopPolicy/23358013496',
      tags: [],
      title: 'Refund Policy',
      type: 'SHOP_POLICY',
      url: '/policies/refund-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633126456',
      resourceId: 'gid://shopify/ShopPolicy/23358111800',
      tags: [],
      title: 'Shipping Policy',
      type: 'SHOP_POLICY',
      url: '/policies/shipping-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633159224',
      resourceId: 'gid://shopify/ShopPolicy/23358079032',
      tags: [],
      title: 'Terms of Service',
      type: 'SHOP_POLICY',
      url: '/policies/terms-of-service',
      items: [],
    },
  ],
};
