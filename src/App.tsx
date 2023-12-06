import { ComponentType, Fragment, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout } from "./Layout";

interface Pages {
  default: ComponentType;
}

const pages = import.meta.glob<true, string, Pages>(
  [
    "./pages/**/*.tsx",
    "!./pages/**/*.lazy.tsx",
    "!./pages/**/_*.tsx",
    "!./pages/**/_*/*.tsx",
  ],
  { eager: true }
);
console.log("pages", pages);

const lazyPages = import.meta.glob<false, string, Pages>([
  "./pages/**/*.lazy.tsx",
  "!./pages/**/_*.tsx",
  "!./pages/**/_*/*.tsx",
]);

const router = createBrowserRouter([
  ...Object.entries(pages).map(([filePath, page]) => {
    const index = filePath.endsWith("index.tsx");

    const path = filePath
      .replace(/^\.\/pages/, "")
      .replace(/(index)?\.tsx?$/, "")
      .replace(/\[(\w+?)\]/g, ":$1");

    console.log("path", path, index);
    const Component = page.default || Fragment;

    return {
      index,
      path,
      element: (
        <Layout>
          <Component />
        </Layout>
      ),
    };
  }),
  ...Object.entries(lazyPages).map(([filePath, lazy]) => {
    const index = filePath.endsWith("index.lazy.tsx");

    const path = filePath
      .replace(/^\.\/pages/, "")
      .replace(/(index\.lazy)?\.tsx?$/, "")
      .replace(/\[(\w+?)\]/g, ":$1");
    console.log("path", path, index);

    return {
      index,
      path,
      async lazy() {
        const { default: Component = Fragment } = await lazy();

        return {
          element: (
            <Layout>
              <Component />
            </Layout>
          ),
        };
      },
    };
  }),
]);

const node = document.getElementById("react-root");

if (node) {
  const root = createRoot(node);

  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}
