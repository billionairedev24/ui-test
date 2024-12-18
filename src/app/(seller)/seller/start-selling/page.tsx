"use client"
import {Button} from "@/components/ui/button"
import {Card, CardContent} from "@/components/ui/card"
import {CheckCircle, HelpCircle, ArrowRight} from "lucide-react"
import Link from "next/link";

const StartSelling = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-8">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 mb-8 mt-20 text-center">
                    Embark on Your AfroTransact Journey
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {[
                        {
                            title: "Register Your Vision",
                            description: "We require relevant personal and business information.",
                        },
                        {
                            title: "Verification",
                            description: "We will verify your information.",
                        },
                        {
                            title: "Start selling!",
                            description: "With verification complete, your products will reach millions of consumers.",
                        },
                    ].map((step, index) => (
                        <Card key={index}
                              className="bg-gradient-to-br from-gray-800 to-gray-900 border-none overflow-hidden group hover:shadow-xl transition-all duration-300">
                            <CardContent className="p-6 relative">
                                <div
                                    className="absolute top-0 right-0 w-24 h-24 bg-yellow-400 rounded-full -mr-12 -mt-12 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                                    <span className="text-black text-4xl font-bold">{index + 1}</span>
                                </div>
                                <h2 className="text-2xl font-semibold mb-4 text-yellow-400">{step.title}</h2>
                                <p className="text-gray-300 group-hover:text-white transition-colors duration-300">{step.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <Card className="bg-gradient-to-r from-yellow-400 to-yellow-300 text-black mb-12">
                    <CardContent className="p-8">
                        <h2 className="text-3xl font-bold mb-6">Essential Checklist for Success</h2>
                        <ul className="space-y-4">
                            {[
                                "Valid Identity document",
                                "A valid Bank account or Credit Card",
                                "mobile phone or computer",
                            ].map((item, index) => (
                                <li key={index} className="flex items-center space-x-3 text-lg">
                                    <CheckCircle className="text-green-600 w-6 h-6 flex-shrink-0"/>
                                    <span>{item}</span>
                                    <HelpCircle className="text-gray-600 w-5 h-5 cursor-pointer flex-shrink-0"/>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                <div className="text-center">
                    <Link href="/seller/onboard">
                        <Button
                            className="bg-yellow-400 text-black hover:bg-yellow-300 text-xl px-12 py-6 rounded-full transform hover:scale-105 transition-all duration-300">
                            Begin Your AfroTransact Adventure
                            <ArrowRight className="ml-2 w-6 h-6"/>
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}


export default StartSelling