type PageTitleProps = {
  title: string;
  count: number;
};

export default function PageTitle({ title, count }: PageTitleProps) {
  return (
    <div className="content-column pt-8 pb-6 lg:pt-10 lg:pb-0 lg:text-center">
      <h1 className="text-[20px] font-medium leading-tight lg:text-[30px]">{title}</h1>
      <p className="text-muted">
        {count} {count === 1 ? "piece" : "pieces"}
      </p>
    </div>
  );
}
