"use client";

import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

function Providers({ children }: React.PropsWithChildren) {
  const [client] = React.useState(new QueryClient());

  return (
    <QueryClientProvider client={client}>
      <ChakraProvider>{children} </ChakraProvider>
    </QueryClientProvider>
  );
}

export default Providers;
