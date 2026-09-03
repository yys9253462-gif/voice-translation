import React, { createContext, useContext } from 'react';

export interface QuotaData {
  balance?: number;
  frozen?: boolean;
  monthlyQuota?: number;
  last30DaysUsage?: number;
  total: number;
  used: number;
  remaining: number;
  resetDate?: string | null;
  plan: string;
  features?: string[];
  rateLimitRpm?: number;
  maxConcurrentSessions?: number;
}

interface UserProfileContextValue {
  user: null;
  quota: null;
  isLoading: false;
  error: null;
  refetchQuota: () => Promise<void>;
  refetchProfile: () => Promise<void>;
  refetchAll: () => Promise<void>;
}

const noop = async () => undefined;
const offlineProfile: UserProfileContextValue = {
  user: null,
  quota: null,
  isLoading: false,
  error: null,
  refetchQuota: noop,
  refetchProfile: noop,
  refetchAll: noop,
};

const UserProfileContext = createContext<UserProfileContextValue>(offlineProfile);

export function useUserProfile() {
  return useContext(UserProfileContext);
}

export function UserProfileProvider({ children }: { children: React.ReactNode }) {
  return (
    <UserProfileContext.Provider value={offlineProfile}>
      {children}
    </UserProfileContext.Provider>
  );
}
