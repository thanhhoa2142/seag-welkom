import BottomBar from "./BottomBar";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="h-dvh flex flex-col">
      <main className="grow overflow-auto">{children}</main>

      <BottomBar />
    </div>
  );
}
