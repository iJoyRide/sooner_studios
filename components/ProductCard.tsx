import Image from "next/image";
import type { Product } from "@/lib/products";

type ProductCardProps = {
  product: Product;
  eager?: boolean;
};

export default function ProductCard({ product, eager = false }: ProductCardProps) {
  return (
    <li>
      <div className="relative aspect-5/6 overflow-hidden bg-tile">
        <Image
          src={product.images.off}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 250px, 50vw"
          loading={eager ? "eager" : undefined}
        />
        <Image
          src={product.images.on}
          alt=""
          fill
          sizes="(min-width: 1024px) 250px, 50vw"
          className="lamp-on"
        />
      </div>
      <h2 className="mt-3 font-medium">{product.name}</h2>
      <p className="text-muted">{product.material}</p>
    </li>
  );
}
