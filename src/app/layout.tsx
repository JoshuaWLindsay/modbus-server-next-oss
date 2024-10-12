import { ReactNode } from 'react';
import { NextUIProvider } from '@nextui-org/react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <NextUIProvider>
      <div>
        {/* Add header or navigation here if needed */}
        {children}
        {/* Add footer here if needed */}
      </div>
    </NextUIProvider>
  );
};

export default Layout;
