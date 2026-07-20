import StoreLayoutClientWrapper from './layout/StoreLayoutClientWrapper';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-noise opacity-20 [background-size:10px_10px]" />
      <StoreLayoutClientWrapper>
        {children}
      </StoreLayoutClientWrapper>
    </div>
  );
}
