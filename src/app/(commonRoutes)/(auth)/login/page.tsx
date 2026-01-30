import { LoginForm } from '@/components/modules/auth/login-form';
import { authClient } from '@/lib/auth-client';
import React from 'react';

const LoginPage = async () => {

    const session = await authClient.getSession()
    console.log(session);
    
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <LoginForm />
            </div>
        </div>
    );
};

export default LoginPage;