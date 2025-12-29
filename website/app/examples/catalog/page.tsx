"use client";

import { useState } from "react";
import { Card, Badge, Button, Pagination } from "@balanceui/core";
import Link from "next/link";

const products = [
  { id: 1, name: "Wireless Headphones", price: "$99", category: "Electronics", rating: 4.5 },
  { id: 2, name: "Smart Watch", price: "$199", category: "Electronics", rating: 4.8 },
  { id: 3, name: "Laptop Stand", price: "$49", category: "Accessories", rating: 4.2 },
  { id: 4, name: "USB-C Cable", price: "$15", category: "Accessories", rating: 4.0 },
  { id: 5, name: "Mechanical Keyboard", price: "$129", category: "Electronics", rating: 4.7 },
  { id: 6, name: "Mouse Pad", price: "$12", category: "Accessories", rating: 4.3 },
];

export default function CatalogExample() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedProducts = products.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link
          href="/examples"
          className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          ← Back to Examples
        </Link>
      </div>

      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          Product Catalog Example
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Product listing with Cards, Pagination, and category filters.
        </p>
      </div>

      <div className="mb-8 flex gap-4">
        <Button variant="solid" size="sm">All</Button>
        <Button variant="stroke" size="sm">Electronics</Button>
        <Button variant="stroke" size="sm">Accessories</Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {displayedProducts.map((product) => (
          <Card
            key={product.id}
            variant="elevated"
            elevation={2}
            style={{
              padding: "1.5rem",
              transition: "all 0.3s ease",
            }}
            className="hover:shadow-lg hover:-translate-y-1"
          >
            <div className="mb-4 h-32 bg-gray-200 rounded flex items-center justify-center">
              <span className="text-gray-400">Image</span>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {product.name}
            </h3>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                {product.price}
              </span>
              <Badge variant="soft">{product.rating} ⭐</Badge>
            </div>
            <div className="mt-4">
              <Badge variant="outline" style={{ fontSize: "0.75rem" }}>
                {product.category}
              </Badge>
            </div>
            <Button
              variant="solid"
              style={{ width: "100%", marginTop: "1rem" }}
            >
              Add to Cart
            </Button>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Pagination
          page={currentPage}
          pageSize={itemsPerPage}
          total={products.length}
          onChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

