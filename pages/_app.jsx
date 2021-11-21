import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "next-auth/client";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </QueryClientProvider>
  );
}

export default MyApp;
