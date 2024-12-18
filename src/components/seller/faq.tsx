import {Card, CardContent} from "@/components/ui/card";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";

const Faq = () => {
    return (
        <div>
            <Card className="border-black">
                <CardContent className="p-6">
                    <h2 className="text-2xl font-semibold text-black mb-4">FAQ</h2>
                    <Accordion type="single" collapsible className="space-y-2">
                        {[
                            {
                                question: "What if my country is not listed?",
                                answer: "If your country is not listed, please contact our support team for assistance in registering your business."
                            },
                            {
                                question: "Why do I need to provide my 'Business Type'?",
                                answer: "Your business type helps us tailor our services to your specific needs and ensure compliance with local regulations."
                            },
                            {
                                question: "Which marketplaces am I registering for?",
                                answer: "You are registering for all AfroTransact African marketplaces. You can choose specific countries to sell in later."
                            },
                            {
                                question: "Do I need to open an account for multiple stores at the same time?",
                                answer: "No, you can start with one store and add more later as your business grows on AfroTransact."
                            },
                            {
                                question: "What are the terms and conditions I am agreeing to?",
                                answer: "You are agreeing to AfroTransact's Business Solutions Agreement, Privacy Notice, and if applicable, International Selling Agreements. We recommend reviewing these documents before proceeding."
                            }
                        ].map((item, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger
                                    className="text-left text-black hover:text-yellow-600">{item.question}</AccordionTrigger>
                                <AccordionContent className="text-gray-700">
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>
        </div>
    )
}

export default Faq