import { Navbar1 } from '@/components/layout/navbar1';
import React, { ReactNode } from 'react';

const CommonLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <Navbar1 />
            {children}
        </div>
    );
};

export default CommonLayout;