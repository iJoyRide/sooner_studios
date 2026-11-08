import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { departments } from "@/lib/categories";

type ProductCardProps = {
  product: Product;
  eager?: boolean;
};

export default function ProductCard({ product, eager = false }: ProductCardProps) {
  const department = departments.find((d) => d.slug === product.department);
  const category = department?.categories.find((c) => c.slug === product.category);
  const detail = product.material ?? category?.label;

  const href =
    product.department === "interior-design"
      ? `/${product.department}/${product.category}/${product.slug}`
      : undefined;

  const content = (
    <>
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
      <p className="text-muted">{detail}</p>
    </>
  );

  return (
    <li>
      {href ? (
        <Link href={href} className="group block">
          {content}
        </Link>
      ) : (
        content
      )}
    </li>
  );
}
