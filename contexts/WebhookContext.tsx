import React, { createContext, useState, useContext } from 'react';

// Define the Webhook structure
interface Filter {
    static: string[];
    dynamic: string[];
    id: string;
}

interface Webhook {
    name: string;
    user: string;
    wallet: string | null;
    actionType: string;
    chainId: number;
    target: string;
    isTurnedOn: boolean;
    walletsFilter: Filter;
    tokenFilter: Filter;
    createdAt: string;
    id: string;
}

// Define the context structure
interface WebhookContextType {
    webhooks: Webhook[];
    setWebhooks: React.Dispatch<React.SetStateAction<Webhook[]>>;
}

const WebhookContext = createContext<WebhookContextType | undefined>(undefined);

interface WebhookProviderProps {
    children: React.ReactNode;
}

// The provider component
export const WebhookProvider: React.FC<WebhookProviderProps> = ({ children }) => {
    const [webhooks, setWebhooks] = useState<Webhook[]>([]);

    return (
        <WebhookContext.Provider value={{ webhooks, setWebhooks }}>
            {children}
        </WebhookContext.Provider>
    );
};

// Custom hook for using the Webhook context
export const useWebhooks = (): WebhookContextType => {
    const context = useContext(WebhookContext);
    if (!context) {
        throw new Error("useWebhooks must be used within a WebhookProvider");
    }
    return context;
};
