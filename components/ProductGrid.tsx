import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/products";

type ProductGridProps = {
  products: Product[];
};

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <ul className="content-column grid grid-cols-2 gap-x-4 gap-y-6 pb-16 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </ul>
  );
}
