import App from "./App";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

// React 18에서는 createRoot를 사용해 렌더링하면, Automatic batching이 활성화됩니다. 
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
