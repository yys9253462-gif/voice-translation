import React from 'react';
import '../locales'; // i18n init side-effect
import { ToastProvider } from './Toast';

interface Props {
  children: React.ReactNode;
}

export const AppProviders: React.FC<Props> = ({ children }) => {
  return (
    <React.StrictMode>
      <ToastProvider>{children}</ToastProvider>
    </React.StrictMode>
  );
};
