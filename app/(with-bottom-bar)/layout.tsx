import BottomBar from "@/components/ui2/bottom-bar";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="h-screen-safe flex flex-col">
      {children}

      <BottomBar />
    </div>
  );
}
