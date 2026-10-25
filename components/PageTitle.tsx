type PageTitleProps = {
  title: string;
  count: number;
};

export default function PageTitle({ title, count }: PageTitleProps) {
  return (
    <div className="content-column pt-8 pb-6 lg:text-center">
      <h1 className="text-[24px] font-medium leading-tight lg:text-[30px]">{title}</h1>
      <p className="mt-1 text-muted">
        {count} {count === 1 ? "piece" : "pieces"}
      </p>
    </div>
  );
}
