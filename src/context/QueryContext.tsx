import { QueryClient, QueryClientProvider, useQuery } from "react-query";
export default function QueryContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
