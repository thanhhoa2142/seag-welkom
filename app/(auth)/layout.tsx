export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        {children}
      </div>
    </div>
  );
}
