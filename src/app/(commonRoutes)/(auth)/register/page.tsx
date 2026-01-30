import { SignupForm } from '@/components/modules/auth/signup-form';
import React from 'react';

const RegisterPage = () => {
    return (
        <div className="grid min-h-svh lg:grid-cols-1">
            <div className="flex flex-col gap-4 p-6 md:p-10">

                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <SignupForm />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default RegisterPage;