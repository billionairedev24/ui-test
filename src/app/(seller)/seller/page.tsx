"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Globe, Package, Truck, UserPlus } from "lucide-react";
import Link from "next/link";

const SellerLandingPage = () => {
    return (
        <div className="w-full">
            {/* Hero Section */}
            <section className="relative bg-black py-20 lg:py-32">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1604689598793-b8bf1dc445a1?q=80&w=2070')] bg-cover bg-center opacity-20" />
                <div className="container mx-auto px-4 relative">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-yellow-400 mb-6">
                            Connect Africa to the World
                        </h1>
                        <p className="text-lg md:text-xl text-yellow-100 mb-8">
                            Empower your business with AfroTransact&apos;s African market expertise and reach millions of customers across the continent.
                        </p>
                        <Link href="/register?as=seller">
                            <Button size="lg" className="bg-yellow-400 text-black hover:bg-yellow-500 font-semibold px-8 py-6 text-lg">
                                Start Selling <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
                        Why Choose AfroTransact?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card className="border-2 border-black/10 hover:border-yellow-400 transition-colors duration-300">
                            <CardHeader>
                                <CardTitle className="flex items-center text-xl text-yellow-600">
                                    <Globe className="mr-3 h-6 w-6" />
                                    African Expertise
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    Leverage our deep understanding of African markets and consumer behavior to grow your business strategically.
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="border-2 border-black/10 hover:border-yellow-400 transition-colors duration-300">
                            <CardHeader>
                                <CardTitle className="flex items-center text-xl text-yellow-600">
                                    <Truck className="mr-3 h-6 w-6" />
                                    Seamless Logistics
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    Benefit from our efficient cross-border shipping and customs clearance solutions across the continent.
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="border-2 border-black/10 hover:border-yellow-400 transition-colors duration-300">
                            <CardHeader>
                                <CardTitle className="flex items-center text-xl text-yellow-600">
                                    <Package className="mr-3 h-6 w-6" />
                                    Market Access
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    Reach millions of customers across multiple African countries through our established marketplace.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
                        How AfroTransact Works
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: <UserPlus className="h-8 w-8" />,
                                title: "Register",
                                description: "Create your AfroTransact seller account in minutes"
                            },
                            {
                                icon: <Package className="h-8 w-8" />,
                                title: "List Products",
                                description: "Add your products to our African marketplace"
                            },
                            {
                                icon: <Globe className="h-8 w-8" />,
                                title: "Sell",
                                description: "Reach customers across the African continent"
                            },
                            {
                                icon: <Truck className="h-8 w-8" />,
                                title: "Ship",
                                description: "We handle logistics and delivery seamlessly"
                            }
                        ].map((step, index) => (
                            <div key={index} className="text-center group">
                                <div className="w-20 h-20 bg-black text-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-yellow-400 group-hover:text-black transition-colors duration-300">
                                    {step.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                                <p className="text-gray-600">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-black text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8">
                        Ready to expand into African markets?
                    </h2>
                    <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                        Join thousands of successful sellers who have grown their business with AfroTransact.
                    </p>
                    <Link href="/signup">
                        <Button size="lg" className="bg-yellow-400 text-black hover:bg-yellow-500 font-semibold px-8 py-6 text-lg">
                            Join AfroTransact Today <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default SellerLandingPage;