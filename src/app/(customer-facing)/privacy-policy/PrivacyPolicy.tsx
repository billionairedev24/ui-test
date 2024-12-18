import React from 'react';
import { Shield, Lock, Eye, Users, Globe, Bell, RefreshCw, HelpCircle, ArrowLeft, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";

const sections = [
    {
        id: 'information-collection',
        icon: Shield,
        title: 'Information Collection',
        content: `We collect information that you provide directly to us, including when you create an account, make a purchase, 
    sign up for our newsletter, or contact us for support. This may include:
    • Name and contact information
    • Payment and billing information
    • Delivery address
    • Purchase history and preferences
    • Communication preferences`,
        examples: [
            'Account registration details',
            'Shopping preferences',
            'Device information',
            'Usage patterns'
        ]
    },
    {
        id: 'data-usage',
        icon: Lock,
        title: 'How We Use Your Data',
        content: `Your data helps us provide and improve our services. We use this information to:
    • Process your orders and payments
    • Provide customer support
    • Send personalized recommendations
    • Improve our platform
    • Detect and prevent fraud
    • Comply with legal obligations`,
        examples: [
            'Order processing',
            'Customer support',
            'Product recommendations',
            'Security measures'
        ]
    },
    {
        id: 'data-sharing',
        icon: Users,
        title: 'Information Sharing',
        content: `We share your information with:
    • Payment processors to handle transactions
    • Delivery partners to fulfill orders
    • Marketing partners (with your consent)
    • Law enforcement when required by law
    We never sell your personal data to third parties.`,
        examples: [
            'Payment processing',
            'Order fulfillment',
            'Marketing services',
            'Legal compliance'
        ]
    },
    {
        id: 'cookies',
        icon: Eye,
        title: 'Cookies & Tracking',
        content: `We use cookies and similar technologies to:
    • Keep you logged in
    • Remember your preferences
    • Analyze site traffic
    • Personalize content
    • Improve site performance
    You can manage cookie preferences through your browser settings.`,
        examples: [
            'Authentication cookies',
            'Preference cookies',
            'Analytics cookies',
            'Marketing cookies'
        ]
    },
    {
        id: 'international',
        icon: Globe,
        title: 'International Transfers',
        content: `We operate globally and may transfer your data to countries with different data protection laws. 
    We ensure appropriate safeguards are in place through:
    • Standard contractual clauses
    • Data processing agreements
    • Privacy Shield certification`,
        examples: [
            'Cross-border transfers',
            'Data protection measures',
            'International compliance',
            'Security standards'
        ]
    },
    {
        id: 'your-rights',
        icon: Bell,
        title: 'Your Rights',
        content: `You have the right to:
    • Access your personal data
    • Correct inaccurate data
    • Request data deletion
    • Object to data processing
    • Data portability
    • Withdraw consent
    Contact our privacy team to exercise these rights.`,
        examples: [
            'Data access requests',
            'Information updates',
            'Account deletion',
            'Consent management'
        ]
    }
];

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 -mt-48 md:-mt-42 lg:-mt-36">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-black via-gray-900 to-black text-white py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
                            Privacy Policy
                        </h1>
                        <p className="text-gray-300 text-lg mb-8">
                            Your privacy is our priority. Learn how we collect, use, and protect your personal information.
                        </p>
                        <div className="flex items-center justify-center space-x-4">
                            <Link href="/" className="text-yellow-400 hover:text-yellow-300 flex items-center">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Home
                            </Link>
                            <span className="text-gray-500">|</span>
                            <span className="text-gray-400">Last updated: March 14, 2024</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 pb-20">
                {/* Quick Navigation */}
                <div className="max-w-7xl mx-auto mb-12">
                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Quick Navigation</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                            {sections.map((section) => (
                                <a
                                    key={section.id}
                                    href={`#${section.id}`}
                                    className="flex flex-col items-center p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200 group"
                                >
                                    <div className="p-3 bg-yellow-400/10 rounded-lg group-hover:bg-yellow-400/20 transition-colors duration-200">
                                        <section.icon className="h-6 w-6 text-yellow-500" />
                                    </div>
                                    <span className="text-sm text-gray-600 text-center mt-2">{section.title}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-4xl mx-auto space-y-12">
                    {sections.map((section) => (
                        <div
                            key={section.id}
                            id={section.id}
                            className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
                        >
                            <div className="flex items-center space-x-4 mb-8">
                                <div className="p-4 bg-yellow-400/10 rounded-xl">
                                    <section.icon className="h-8 w-8 text-yellow-500" />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900">{section.title}</h2>
                            </div>

                            <div className="prose prose-lg max-w-none text-gray-600">
                                {section.content.split('\n').map((paragraph, index) => (
                                    <p key={index} className="whitespace-pre-line mb-4">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>

                            {section.examples && (
                                <div className="mt-8 bg-gray-50 rounded-xl p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Examples</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {section.examples.map((example, index) => (
                                            <div key={index} className="flex items-center space-x-2">
                                                <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                                                <span className="text-gray-600">{example}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Contact Banner */}
                <div className="max-w-4xl mx-auto mt-16">
                    <div className="bg-gradient-to-r from-yellow-400/20 via-yellow-400/10 to-transparent rounded-2xl p-12">
                        <div className="text-center">
                            <h3 className="text-3xl font-bold mb-4 text-gray-900">Need More Information?</h3>
                            <p className="text-gray-600 mb-8 text-lg">
                                Our dedicated privacy team is here to address your concerns and help you understand how we protect your data.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link href="/contact">
                                    <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3 rounded-full">
                                        Contact Privacy Team
                                        <ExternalLink className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                                <Link href="/faq">
                                    <Button variant="outline" className="px-8 py-3 rounded-full">
                                        View Privacy FAQs
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;