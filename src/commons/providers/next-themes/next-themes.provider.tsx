'use client';

import { ThemeProvider } from 'next-themes';
import React, { ReactNode } from 'react';

interface NextThemesProviderProps {
  children: ReactNode;
}

export function NextThemesProvider({ children }: NextThemesProviderProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
