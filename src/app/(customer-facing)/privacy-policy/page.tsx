'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"

const PrivacyPolicy = ()=>  {
    const [agreed, setAgreed] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (agreed) {
            // Handle the submission (e.g., send to server, update user profile, etc.)
            console.log("Form submitted - user agreed to privacy policy")
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex items-center justify-center -mt-24 py-2 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl w-full space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-yellow-400">ShopSmart Privacy Policy</h1>
                </div>

                <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
                    <ScrollArea className="h-96 rounded-md border border-gray-200 p-4">
                        <div className="space-y-4 text-sm">
                            <h2 className="text-xl font-semibold text-yellow-400">1. Information We Collect</h2>
                            <p>
                                We collect information you provide directly to us, such as when you create an account, make a purchase, or contact customer support. This may include your name, email address, postal address, phone number, and payment information.
                            </p>

                            <h2 className="text-xl font-semibold text-yellow-400">2. How We Use Your Information</h2>
                            <p>
                                We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, and respond to your comments and questions.
                            </p>

                            <h2 className="text-xl font-semibold text-yellow-400">3. Information Sharing and Disclosure</h2>
                            <p>
                                We do not sell or rent your personal information to third parties. We may share your information with service providers who perform services on our behalf, such as payment processing and delivery services.
                            </p>

                            <h2 className="text-xl font-semibold text-yellow-400">4. Data Security</h2>
                            <p>
                                We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction.
                            </p>

                            <h2 className="text-xl font-semibold text-yellow-400">5. Your Rights and Choices</h2>
                            <p>
                                You may update, correct, or delete your account information at any time by logging into your online account or by contacting us. You may also opt out of receiving promotional communications from us by following the instructions in those messages.
                            </p>

                            <h2 className="text-xl font-semibold text-yellow-400">6. Cookie Policy</h2>
                            <p>
                                We use cookies and similar tracking technologies to collect information about your browsing activities on our website. Cookies are small data files stored on your device that help us improve our services and your experience, secure our services, and remember your preferences. You can manage your cookie preferences through your browser settings.
                            </p>

                            <h2 className="text-xl font-semibold text-yellow-400">7. Email Communications</h2>
                            <p>
                                We may use your email address to send you information about our products and services,
                                updates about your account, and responses to your inquiries. You can opt out of promotional
                                emails at any time by clicking the Unsubscribe link at the bottom of our emails.
                                However, you will still receive transactional emails related to your account and purchases.
                            </p>

                            <h2 className="text-xl font-semibold text-yellow-400">8. Text Messages</h2>
                            <p>
                                If you provide us with your mobile phone number, we may send you text messages about
                                order updates, delivery notifications, and occasional promotional offers. You can opt
                                out of text messages at any time by replying STOP to any message. Message and data rates
                                may apply.
                            </p>

                            <h2 className="text-xl font-semibold text-yellow-400">9. Changes to this Policy</h2>
                            <p>
                                We may update this privacy policy from time to time. We will notify you of any changes by
                                posting the new privacy policy on this page and updating the Last Updated date.
                            </p>

                            <p className="text-gray-500">Last Updated: November 14, 2023</p>
                        </div>
                    </ScrollArea>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="terms"
                                checked={agreed}
                                onCheckedChange={(checked) => setAgreed(checked as boolean)}
                                className="border-yellow-400 text-yellow-400 focus:ring-yellow-400"
                            />
                            <label
                                htmlFor="terms"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                I agree to the privacy policy, cookie policy, and terms of service
                            </label>
                        </div>

                        <Button
                            type="submit"
                            disabled={!agreed}
                            className="w-full bg-yellow-400 text-gray-900 hover:bg-yellow-500 focus:ring-yellow-400"
                        >
                            Accept and Continue
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default PrivacyPolicy