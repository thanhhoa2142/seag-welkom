interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div className={cn("flex-1 space-y-4 p-4 overflow-auto", className)}>
      {children}
    </div>
  );
}
