export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BalanceUI",
    url: "https://balanceui.com",
    logo: "https://balanceui.com/logo.png",
    description:
      "A modern, accessible React component library built with TypeScript",
    sameAs: [
      "https://github.com/balanceui",
      "https://twitter.com/balanceui",
    ],
  };

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "BalanceUI",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    description:
      "A beautiful, accessible, and customizable React component library",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationSchema),
        }}
      />
    </>
  );
}

