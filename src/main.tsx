import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();
// import App from "./App";

import { register } from "swiper/element/bundle";
register();
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Teste from "./Components/Teste";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Teste />
    </QueryClientProvider>
  </React.StrictMode>
);
