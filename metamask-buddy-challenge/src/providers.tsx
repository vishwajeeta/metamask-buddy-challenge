"use client";
import { useState, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import config from "@/rainbowKitConfig";
import { WagmiConfig } from "wagmi";
import { RainbowKitProvider,ConnectButton } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css"

export function Providers(props: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={config}>
        <RainbowKitProvider>
            <ConnectButton/>
          {props.children}
        </RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  );
}
