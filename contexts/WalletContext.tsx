import React, { createContext, useState, useContext, ReactNode } from 'react';

type Wallet = {
    address: string;
    nickname: string;
    tradeWebhook?: string;
    botTradeLogs: any[];
    withdrawLogs: any[];
    id: string;
};

type WalletContextType = {
    wallets: { [key: string]: Wallet };
    setWallets: React.Dispatch<React.SetStateAction<{ [key: string]: Wallet }>>;
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

type WalletProviderProps = {
    children: ReactNode;
};

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
    const [wallets, setWallets] = useState<{ [key: string]: Wallet }>({});

    return (
        <WalletContext.Provider value={{ wallets, setWallets }}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWallets = (): WalletContextType => {
    const context = useContext(WalletContext);
    if (!context) {
        throw new Error("useWallets must be used within a WalletProvider");
    }
    return context;
};
