export default function Step({
  title,
  children,
}: React.PropsWithChildren<{ title?: string }>) {
  return (
    <>
      {title && (
        <div className='text-[34px] font-bold text-center'>{title}</div>
      )}
      {children}
    </>
  );
}
