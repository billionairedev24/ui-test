'use client'
import React from 'react'
import { Instagram, Linkedin, Twitter, Mail, ArrowUp, ShoppingBag, Globe, Shield, Truck, CreditCard, Clock, Award, Gift, Heart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"

const footerLinks = [
    {
        title: "Discover AfroTransact",
        links: [
            { name: "Our Story", href: "/our-story" },
            { name: "Artisan Spotlight", href: "/artisans" },
            { name: "Sustainability", href: "/sustainability" },
            { name: "Careers", href: "/careers" },
            { name: "Press", href: "/press" }
        ]
    },
    {
        title: "Customer Service",
        links: [
            { name: "Contact Us", href: "/contact" },
            { name: "Shipping & Returns", href: "/shipping" },
            { name: "FAQs", href: "/faqs" },
            { name: "Size Guide", href: "/size-guide" },
            { name: "Track Order", href: "/track" }
        ]
    },
    {
        title: "Shop by Category",
        links: [
            { name: "Fashion", href: "/category/fashion" },
            { name: "Home & Living", href: "/category/home" },
            { name: "Beauty & Wellness", href: "/category/beauty" },
            { name: "Art & Collectibles", href: "/category/art" },
            { name: "Jewelry", href: "/category/jewelry" }
        ]
    }
]

const features = [
    {
        icon: Globe,
        title: "Global Reach",
        description: "Delivery to 190+ countries",
        color: "text-blue-400",
        bgColor: "bg-blue-400/10",
        hoverBg: "group-hover:bg-blue-400/20"
    },
    {
        icon: Shield,
        title: "Secure Shopping",
        description: "100% secure payment",
        color: "text-green-400",
        bgColor: "bg-green-400/10",
        hoverBg: "group-hover:bg-green-400/20"
    },
    {
        icon: Truck,
        title: "Express Delivery",
        description: "Fast & reliable shipping",
        color: "text-purple-400",
        bgColor: "bg-purple-400/10",
        hoverBg: "group-hover:bg-purple-400/20"
    },
    {
        icon: CreditCard,
        title: "Easy Returns",
        description: "30-day guarantee",
        color: "text-yellow-400",
        bgColor: "bg-yellow-400/10",
        hoverBg: "group-hover:bg-yellow-400/20"
    }
]

const achievements = [
    {
        icon: Award,
        value: "10M+",
        label: "Happy Customers"
    },
    {
        icon: Gift,
        value: "50K+",
        label: "Products Available"
    },
    {
        icon: Clock,
        value: "24/7",
        label: "Customer Support"
    },
    {
        icon: Heart,
        value: "95%",
        label: "Satisfaction Rate"
    }
]

const Footer = () => {
    return (
        <footer className="bg-gradient-to-b from-black via-gray-900 to-black text-gray-300">
            {/* Features Section */}
            <div className="container mx-auto px-6 lg:px-12 py-16 border-b border-gray-800">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {features.map((feature, index) => (
                        <div key={index}
                             className="flex items-center space-x-4 group p-6 rounded-2xl bg-gray-800/30 hover:bg-gray-800/50 transition-all duration-300 transform hover:-translate-y-1">
                            <div className={`p-4 rounded-xl ${feature.bgColor} ${feature.hoverBg} transition-colors duration-300`}>
                                <feature.icon className={`h-7 w-7 ${feature.color}`} />
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-white mb-1">{feature.title}</h4>
                                <p className="text-sm text-gray-400">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Achievements Section */}
            <div className="container mx-auto px-6 lg:px-12 py-16 border-b border-gray-800">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                    {achievements.map((achievement, index) => (
                        <div key={index} className="group">
                            <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-yellow-400/10 group-hover:bg-yellow-400/20 transition-colors duration-300 mb-4">
                                <achievement.icon className="h-8 w-8 text-yellow-400" />
                            </div>
                            <div className="text-2xl font-bold text-white mb-2">{achievement.value}</div>
                            <div className="text-sm text-gray-400">{achievement.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="container mx-auto px-6 lg:px-12">
                {/* Back to top button */}
                <div className="text-center py-12">
                    <Button
                        onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
                        className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-8 rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-yellow-400/20"
                    >
                        Back to top <ArrowUp className="inline-block ml-2 h-4 w-4 animate-bounce" />
                    </Button>
                </div>

                {/* Brand and Newsletter */}
                <div className="py-16 border-b border-gray-800">
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-12">
                        <div className="text-center lg:text-left max-w-lg">
                            <div className="flex items-center justify-center lg:justify-start mb-6">
                                <div className="w-20 h-20 relative">
                                    <Image
                                        className="rounded-full border-2 border-yellow-400 p-1.5"
                                        src="/images/logo.png"
                                        alt="AfroTransact Logo"
                                        width={80}
                                        height={80}
                                    />
                                </div>
                                <span className="text-4xl font-bold text-white ml-5">AfroTransact</span>
                            </div>
                            <p className="text-xl text-gray-400">
                                Connecting you to authentic African craftsmanship and culture, one transaction at a time.
                            </p>
                        </div>
                        <div className="w-full lg:w-auto max-w-md">
                            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-8 rounded-2xl backdrop-blur-sm shadow-xl">
                                <h3 className="text-2xl font-bold text-white mb-4">Join our community</h3>
                                <p className="text-gray-400 mb-6">Get exclusive offers and updates straight to your inbox.</p>
                                <form className="space-y-4">
                                    <Input
                                        type="email"
                                        placeholder="Enter your email address"
                                        className="w-full rounded-full border-gray-700 bg-gray-800/50 text-white focus:ring-2 focus:ring-yellow-400 placeholder-gray-500 py-6"
                                    />
                                    <Button className="w-full rounded-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-6 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-400/20">
                                        Subscribe Now
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main footer content */}
                <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
                    {footerLinks.map((section, index) => (
                        <div key={index} className="space-y-6">
                            <h3 className="font-bold text-2xl text-white">{section.title}</h3>
                            <ul className="space-y-4">
                                {section.links.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                        <Link
                                            href={link.href}
                                            className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 flex items-center group text-lg"
                                        >
                                            <span className="w-0 group-hover:w-3 h-0.5 bg-yellow-400 mr-0 group-hover:mr-3 transition-all duration-300"></span>
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Seller Section */}
                <div className="py-16 border-t border-gray-800">
                    <div className="bg-gradient-to-r from-yellow-400/20 via-yellow-400/10 to-transparent rounded-3xl p-12 backdrop-blur-sm">
                        <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
                            <div className="text-center lg:text-left">
                                <h3 className="text-3xl font-bold text-white mb-4">Sell on AfroTransact</h3>
                                <p className="text-xl text-gray-300">Join thousands of successful sellers and reach millions of customers worldwide</p>
                            </div>
                            <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-6 px-10 rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-yellow-400/20 text-lg">
                                <ShoppingBag className="inline-block mr-3 h-6 w-6" />
                                Start Selling
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Social Media and Copyright */}
                <div className="py-12 border-t border-gray-800">
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
                        <div className="flex space-x-8">
                            {[
                                { icon: Instagram, href: "#", label: "Instagram" },
                                { icon: Linkedin, href: "#", label: "LinkedIn" },
                                { icon: Twitter, href: "#", label: "Twitter" },
                                { icon: Mail, href: "#", label: "Email" }
                            ].map((social, index) => (
                                <Link
                                    key={index}
                                    href={social.href}
                                    className="group flex flex-col items-center"
                                    aria-label={social.label}
                                >
                                    <div className="p-3 rounded-full bg-gray-800/50 group-hover:bg-yellow-400/20 transition-all duration-300">
                                        <social.icon className="h-6 w-6 text-gray-400 group-hover:text-yellow-400" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <div className="text-center lg:text-right">
                            <p className="text-gray-400 text-lg">&copy; 2024 AfroTransact. All rights reserved.</p>
                            <div className="mt-6 space-x-8">
                                {[
                                    { name: "Terms of Service", href: "#" },
                                    { name: "Privacy Policy", href: "/privacy-policy" },
                                    { name: "Accessibility", href: "#" }
                                ].map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.href}
                                        className="text-gray-400 hover:text-yellow-400 transition-colors duration-300"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer