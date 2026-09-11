"use client";

import React, { useEffect, useRef, useState } from "react";
import { ProductCard } from "@/components/public/catalog/ProductCard";
import { ProductModal, ProductData } from "@/components/public/ProductModal";

interface CatalogGridClientProps {
  products: ProductData[];
  badge?: {
    en: string;
    ar: string;
  };
  gridClassName?: string;
}

export function CatalogGridClient({
  products,
  badge,
  gridClassName = "mx-auto grid max-w-[1140px] grid-cols-1 gap-6 md:grid-cols-3",
}: CatalogGridClientProps) {
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(
    null
  );
  const [isInView, setIsInView] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = gridRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={gridRef} className={gridClassName}>
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            index={index}
            isInView={isInView}
            onSelect={(prod) => setSelectedProduct(prod)}
            badge={badge}
          />
        ))}
      </div>

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
}
