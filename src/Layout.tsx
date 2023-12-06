import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

export function Layout({ children }: PropsWithChildren) {
  return (
    <div
      style={{ display: "grid", gap: "1rem", gridTemplateColumns: "200px 1fr" }}
    >
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/hello/world">Hello world</Link>
          </li>
          <li>
            <Link to="/foo">Foo</Link>
          </li>
          <li>
            <Link to="/bar">Bar (Lazy loaded)</Link>
          </li>
        </ul>
      </nav>
      <div>{children}</div>
    </div>
  );
}
