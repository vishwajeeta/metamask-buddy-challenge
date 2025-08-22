// RootLayout.tsx
import { ReactNode } from "react";
import { Providers } from "./providers";

export default function RootLayout(props: { children: ReactNode }) {
  return <Providers>{props.children}</Providers>;
}
