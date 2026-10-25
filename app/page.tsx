import { getByCategory, getByDepartment } from "@/lib/products";

export default function Home() {
  const lighting = getByDepartment("lighting");
  const sconces = getByCategory("lighting", "sconces");

  return (
    <div className="p-8">
      <p>Lighting: {lighting.length} pieces</p>
      <p>Sconces: {sconces.length} pieces</p>
    </div>

  );
}

