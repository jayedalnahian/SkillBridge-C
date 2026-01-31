import { Navbar } from '@/components/layout/navbar1';
import React, { ReactNode } from 'react';
type UserType = {
    name: string;
    email: string;
    role: "STUDENT" | "TUTOR" | "ADMIN";
    image?: string;
};
const CommonLayout = async ({ children }: { children: ReactNode }) => {
 
    return (
        <div>
            <Navbar />
            {children}
        </div>
    );
};

export default CommonLayout;