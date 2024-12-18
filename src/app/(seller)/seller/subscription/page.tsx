"use client"

import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const subscriptionPlans = [
    {
        id: 'monthly',
        name: 'Monthly',
        price: 29.99,
        interval: 'month',
        features: ['Full access to platform', 'Customer support', 'Up to 100 products'],
    },
    {
        id: 'quarterly',
        name: 'Quarterly',
        price: 79.99,
        interval: '3 months',
        features: ['All Monthly features', '10% discount', 'Up to 250 products'],
        savings: 10,
    },
    {
        id: 'yearly',
        name: 'Yearly',
        price: 299.99,
        interval: 'year',
        features: ['All Quarterly features', '20% discount', 'Unlimited products', 'Priority support'],
        savings: 20,
    },
];

export default function SubscriptionPage() {
    const [selectedPlan, setSelectedPlan] = useState(subscriptionPlans[1].id);

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Choose Your Subscription Plan
                    </h1>
                    <p className="mt-4 text-xl text-gray-600">
                        Select the plan that best fits your business needs
                    </p>
                </div>

                <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0">
                    {subscriptionPlans.map((plan) => (
                        <Card
                            key={plan.id}
                            className={`flex flex-col ${
                                selectedPlan === plan.id
                                    ? 'border-4 border-yellow-400'
                                    : 'border border-gray-200'
                            }`}
                        >
                            <CardHeader>
                                <CardTitle className="text-2xl font-semibold text-gray-900">{plan.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-4xl font-extrabold text-gray-900">
                                    ${plan.price}
                                    <span className="text-base font-medium text-gray-500">/{plan.interval}</span>
                                </p>
                                {plan.savings && (
                                    <p className="mt-1 text-sm text-green-600">Save {plan.savings}%</p>
                                )}
                                <ul className="mt-6 space-y-4">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-start">
                                            <CheckCircle className="flex-shrink-0 h-6 w-6 text-yellow-400" aria-hidden="true" />
                                            <span className="ml-3 text-base text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter className="bg-gray-50 mt-auto">
                                <Button
                                    onClick={() => setSelectedPlan(plan.id)}
                                    className={`w-full ${
                                        selectedPlan === plan.id
                                            ? 'bg-yellow-400 text-black hover:bg-yellow-500'
                                            : 'bg-black text-white hover:bg-gray-800'
                                    }`}
                                    variant={selectedPlan === plan.id ? "default" : "secondary"}
                                >
                                    {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                <div className="mt-10 text-center">
                    <Button
                        size="lg"
                        className="bg-yellow-400 text-black hover:bg-yellow-500"
                    >
                        Subscribe Now
                    </Button>
                </div>
            </div>
        </div>
    );
}

