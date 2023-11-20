import React, { useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useWallets } from '@/contexts/WalletContext';
import { useWebhooks } from '@/contexts/WebhookContext';
import { useAuthentication } from '@/contexts/AuthenticationContext';
import { useApiClient } from '@/hooks/apiClient';

interface ConnectWalletButtonProps {
  connectWalletButtonRef: React.RefObject<HTMLButtonElement>;
}

const RainbowConnect: React.FC<ConnectWalletButtonProps> = ({ connectWalletButtonRef }) => {
  const { setWallets } = useWallets();
  const { setWebhooks } = useWebhooks();
  const { isRefreshTokenValid } = useAuthentication();
  const { apiClient } = useApiClient();

  useEffect(() => {
    if (isRefreshTokenValid) {
      getWalletAddresses();
      getWebhooks();
    }
  }, [isRefreshTokenValid]);

  const getWalletAddresses = async () => {
    const address = localStorage.getItem('userWalletAddress');
    const walletURL = `${process.env.NEXT_PUBLIC_HOST || ''}/api/users/${address}/wallets`;

    try {
      const data = await apiClient(walletURL);
      const walletData = Object.values(data);

      // @ts-ignore
      setWallets(walletData);
    } catch (error) {
      console.error('Error:', error);
      // @ts-ignore
    }
  }

  const getWebhooks = async () => {
    const address = localStorage.getItem('userWalletAddress');
    const walletURL = `${process.env.NEXT_PUBLIC_HOST || ''}/api/users/${address}/webhooks`;

    try {
      const data = await apiClient(walletURL);

      setWebhooks(Object.values(data));
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button ref={connectWalletButtonRef} onClick={openConnectModal} type="button" className="headerButton min-w-[145px]">
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }

              return (
                <div className="flex">
                  <button
                    onClick={openChainModal}
                    style={{ display: 'flex', alignItems: 'center' }}
                    type="button"
                    className="headerButton"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: 'hidden',
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{ width: 12, height: 12 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button>

                  <div onClick={openAccountModal} className="headerButton">
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ''}
                  </div>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  )
};

export default RainbowConnect;

