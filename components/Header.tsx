import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-rule lg:border-b-0">
      <div className="content-column py-5">
        <Link href="/" className="text-[19px] font-bold tracking-[-0.02em]">
          Sooner
        </Link>
      </div>
    </header>
  );
}
