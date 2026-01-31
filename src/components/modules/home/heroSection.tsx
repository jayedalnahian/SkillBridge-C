'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, BookOpen, Users, Star, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function HeroSection() {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState('')

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            router.push(`/tutors?search=${encodeURIComponent(searchQuery)}`)
        }
    }

    const stats = [
        { icon: Users, label: 'Expert Tutors', value: '500+' },
        { icon: BookOpen, label: 'Subjects', value: '50+' },
        { icon: Star, label: 'Average Rating', value: '4.8' },
        { icon: TrendingUp, label: 'Success Rate', value: '95%' },
    ]

    const popularSubjects = [
        'Mathematics',
        'Physics',
        'Programming',
        'English',
        'Chemistry',
        'Web Development',
    ]

    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
                {/* Main Content */}
                <div className="text-center mb-12">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg mb-6">
                        <div className="flex -space-x-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 border-2 border-white"></div>
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 border-2 border-white"></div>
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-red-500 border-2 border-white"></div>
                        </div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Join 10,000+ students learning today
                        </span>
                    </div>

                    {/* Heading */}
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
                        Connect with Expert Tutors,
                        <br />
                        <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Learn Anything
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
                        Find qualified tutors for any subject. Book sessions instantly and
                        start learning from the best educators around the world.
                    </p>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className="relative flex-1">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <Input
                                    type="text"
                                    placeholder="Search for tutors, subjects, or topics..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-12 pr-4 py-6 text-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <Button
                                type="submit"
                                size="lg"
                                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-6 text-lg shadow-lg"
                            >
                                Search Tutors
                            </Button>
                        </div>
                    </form>

                    {/* Popular Subjects */}
                    <div className="flex flex-wrap justify-center gap-2 mb-10">
                        <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">
                            Popular:
                        </span>
                        {popularSubjects.map((subject) => (
                            <Badge
                                key={subject}
                                variant="secondary"
                                className="cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
                                onClick={() => router.push(`/tutors?category=${subject}`)}
                            >
                                {subject}
                            </Badge>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            onClick={() => router.push('/tutors')}
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 shadow-xl"
                        >
                            <Search className="mr-2 w-5 h-5" />
                            Find a Tutor
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            onClick={() => router.push('/register')}
                            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-8 shadow-xl"
                        >
                            <BookOpen className="mr-2 w-5 h-5" />
                            Become a Tutor
                        </Button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon
                        return (
                            <Card
                                key={index}
                                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-none shadow-xl hover:shadow-2xl transition-shadow"
                            >
                                <CardContent className="p-6 text-center">
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 mb-3">
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        {stat.label}
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </div>

            {/* Add these animations to your globals.css */}
            <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
        </section>
    )
}