interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className={className}>{children}</div>
    </div>
  );
}
