import { useState, useCallback, useEffect } from 'react';
import { 
  useAccount, 
  useConnect, 
  useDisconnect, 
  useBalance,
  useChainId,
  useConfig 
} from 'wagmi';
import { WalletState } from '@/types/wallet';
import { metaMask } from 'wagmi/connectors';
import { useConnectModal } from '@rainbow-me/rainbowkit';

export const useWallet = () => {
  const config = useConfig();
  const { address, isConnected, connector } = useAccount();
  const { connect, connectors, error, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const { data: balance } = useBalance({ address });
  
  
  const [walletState, setWalletState] = useState<WalletState>({
    address: null,
    isConnected: false,
    isConnecting: false,
    error: null,
    chainId: null,
    balance: null,
  });

   const { openConnectModal } = useConnectModal();
  // Check if MetaMask is installed
  const isMetamaskInstalled = typeof window !== 'undefined' && 
    Boolean(window.ethereum?.isMetaMask);

  // Update wallet state when Wagmi state changes
  useEffect(() => {
    setWalletState({
      address,
      isConnected,
      isConnecting: isPending,
      error: error?.message || null,
      chainId,
      balance: balance ? {
        value: balance.value,
        formatted: balance.formatted,
        symbol: balance.symbol,
        decimals: balance.decimals
      } : null,
    });
  }, [address, isConnected, isPending, error, chainId, balance]);

  // Connect wallet function
  const connectWallet = useCallback(async () => {
    try {
      // Use RainbowKit's modal if available
      if (openConnectModal) {
        openConnectModal();
      } 
      // Fallback to direct connection
      else if (isMetamaskInstalled) {
        connect({ connector: metaMask() });
      } else {
        const availableConnectors = connectors.filter(
          connector => connector.ready
        );
        
        if (availableConnectors.length > 0) {
          connect({ connector: availableConnectors[0] });
        } else {
          throw new Error('No wallet connectors available');
        }
      }
    } catch (err) {
      setWalletState(prev => ({
        ...prev,
        error: err.message,
        isConnecting: false
      }));
    }
  }, [openConnectModal, connect, connectors, isMetamaskInstalled]);
  

  // Disconnect wallet function
  const disconnectWallet = useCallback(() => {
    disconnect();
    setWalletState({
      address: null,
      isConnected: false,
      isConnecting: false,
      error: null,
      chainId: null,
      balance: null,
    });
  }, [disconnect]);

  return {
    ...walletState,
    isMetamaskInstalled,
    connect: connectWallet,
    disconnect: disconnectWallet,
    connector: connector?.name || null,
  };
};