import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import pxlLarge from "./assets/fonts/pxl-large.woff2";
import pxlSmall from "./assets/fonts/pxl-small.woff2";
import "./index.css";

const preloadFonts = [
  { id: "8pxl", url: pxlSmall },
  { id: "16pxl", url: pxlLarge },
];

preloadFonts.forEach((font) => {
  const link = document.createElement("link");
  link.rel = "preload";
  link.href = font.url;
  link.as = "font";
  link.type = "font/woff2";
  link.crossOrigin = "anonymous";
  link.setAttribute("data-font", font.id);
  document.head.appendChild(link);
});

const fontFaceCSS = `
  @font-face {
    font-family: 'pxlSmall';
    src: url('${pxlSmall}') format('woff2');
    font-display: swap;
  }
  @font-face {
    font-family: 'pxlLarge';
    src: url('${pxlLarge}') format('woff2');
    font-display: swap;
  }
`;

const style = document.createElement("style");
style.textContent = fontFaceCSS;
document.head.appendChild(style);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
