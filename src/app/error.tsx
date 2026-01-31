'use client'

import { useEffect } from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log error to error reporting service
        console.error('Application Error:', error)
    }, [error])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-red-900 dark:to-orange-900 px-4">
            <div className="max-w-2xl w-full text-center">
                {/* Error Icon */}
                <div className="mb-8">
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-red-100 to-orange-100 dark:from-red-900 dark:to-orange-900 animate-pulse">
                        <AlertTriangle className="w-12 h-12 text-red-600 dark:text-red-400" />
                    </div>
                </div>

                {/* Heading */}
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                    Oops! Something went wrong
                </h1>

                {/* Description */}
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
                    We encountered an unexpected error. Don't worry, our team has been
                    notified and we're working on it.
                </p>

                {/* Error Details (Development only) */}
                {process.env.NODE_ENV === 'development' && (
                    <div className="mb-8 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-left overflow-auto">
                        <p className="text-sm font-mono text-red-600 dark:text-red-400 mb-2">
                            <strong>Error:</strong> {error.message}
                        </p>
                        {error.digest && (
                            <p className="text-xs font-mono text-gray-500">
                                Error ID: {error.digest}
                            </p>
                        )}
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                    <Button
                        onClick={reset}
                        size="lg"
                        className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white shadow-lg"
                    >
                        <RefreshCw className="mr-2 w-5 h-5" />
                        Try Again
                    </Button>

                    <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="border-2 border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                        <Link href="/">
                            <Home className="mr-2 w-5 h-5" />
                            Go to Homepage
                        </Link>
                    </Button>
                </div>

                {/* Help Section */}
                <div className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Need Help?
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        If this problem persists, please contact our support team.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Button asChild variant="link" className="text-blue-600">
                            <Link href="/contact">Contact Support</Link>
                        </Button>
                        <span className="text-gray-400 hidden sm:block">|</span>
                        <Button asChild variant="link" className="text-blue-600">
                            <Link href="/help">Help Center</Link>
                        </Button>
                    </div>
                </div>

                {/* Tips */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                    <div className="p-4 bg-white/40 dark:bg-gray-800/40 rounded-lg">
                        <p className="font-semibold text-gray-900 dark:text-white mb-1">
                            Refresh the page
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                            Sometimes a simple refresh fixes the issue
                        </p>
                    </div>
                    <div className="p-4 bg-white/40 dark:bg-gray-800/40 rounded-lg">
                        <p className="font-semibold text-gray-900 dark:text-white mb-1">
                            Check your connection
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                            Make sure you're connected to the internet
                        </p>
                    </div>
                    <div className="p-4 bg-white/40 dark:bg-gray-800/40 rounded-lg">
                        <p className="font-semibold text-gray-900 dark:text-white mb-1">
                            Clear cache
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                            Try clearing your browser cache and cookies
                        </p>
                    </div>
                </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-20 w-72 h-72 bg-red-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute top-1/3 -right-20 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
            </div>
        </div>
    )
}