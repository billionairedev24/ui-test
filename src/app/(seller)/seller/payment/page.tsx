"use client"

import {useState} from "react"
import {Card, CardHeader, CardTitle, CardContent, CardFooter} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {Checkbox} from "@/components/ui/checkbox"
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group"
import {Separator} from "@/components/ui/separator"
import {Button} from "@/components/ui/button"
import {CreditCardIcon, WalletCardsIcon} from "lucide-react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {PaymentSchema, TPaymentFormValidator} from "@/lib/validators/PaymentFormValidator";

const paymentMethods = [
    {id: "stripe", label: "Stripe", icon: <CreditCardIcon/>},
    {id: "google-pay", label: "Google Pay", icon: <WalletCardsIcon/>},
    {id: "apple-pay", label: "Apple Pay", icon: <WalletCardsIcon/>},
    {id: "paypal", label: "PayPal", icon: <WalletCardsIcon/>},
];

const SellerPaymentPage = () => {

    const form = useForm<TPaymentFormValidator>({
        resolver: zodResolver(PaymentSchema),
        defaultValues: {}
    })

    const [isBillingAddressSame, setIsBillingAddressSame] = useState(true)
    const [paymentMethod, setPaymentMethod] = useState("stripe")
    const handleBillingAddressChange = () => {
        setIsBillingAddressSame(!isBillingAddressSame)
    }
    const handlePaymentMethodChange = (method: string) => {
        setPaymentMethod(method)
    }
    const handleSubmit = () => {
        switch (paymentMethod) {
            case "stripe":
                window.location.href = "https://stripe.com/payment"
                break
            case "google-pay":
                window.location.href = "https://pay.google.com/payment"
                break
            case "apple-pay":
                window.location.href = "https://www.apple.com/apple-pay/"
                break
            case "paypal":
                window.location.href = "https://www.paypal.com/payment"
                break
            default:
                break
        }
    }
    return (
        <div className="container mx-auto max-w-4xl px-4 py-8 md:px-6 md:py-12">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} method="POST">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="space-y-4">
                            <div>
                                <h1 className="text-2xl font-bold">Payment</h1>
                                <p className="text-muted-foreground">Complete your payment to finalize your order.</p>
                            </div>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Vendor Details</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-4">
                                        <div className="grid gap-2">
                                            <FormField
                                                control={form.control}
                                                name="name"
                                                render={({field}) => (
                                                    <FormItem>
                                                        <FormLabel>Vendor Name</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                type="text"
                                                                placeholder="John Doe"
                                                            />
                                                        </FormControl>
                                                        <FormMessage/>
                                                        <FormDescription/>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <FormField
                                                control={form.control}
                                                name="businessName"
                                                render={({field}) => (
                                                    <FormItem>
                                                        <FormLabel>Business Name</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                type="text"
                                                                placeholder="AfroTransct Inc"
                                                            />
                                                        </FormControl>
                                                        <FormMessage/>
                                                        <FormDescription/>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <FormField
                                                control={form.control}
                                                name="businessAddress"
                                                render={({field}) => (
                                                    <FormItem>
                                                        <FormLabel>Business Address</FormLabel>
                                                        <FormControl>
                                                            <Textarea
                                                                {...field}
                                                                placeholder="123 Main St, Anytown USA"
                                                            />
                                                        </FormControl>
                                                        <FormMessage/>
                                                        <FormDescription/>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Billing Address</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-4">
                                        <FormField
                                            control={form.control}
                                            name="isAddressSame"
                                            render={({field}) => (
                                                <FormItem className="flex items-center space-x-2">
                                                    <FormLabel>Same as business address</FormLabel>
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={isBillingAddressSame}
                                                            onCheckedChange={handleBillingAddressChange}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                    <FormDescription/>
                                                </FormItem>
                                            )}
                                        />

                                        {!isBillingAddressSame && (
                                            <div className="grid gap-2">
                                                <div className="grid gap-2">
                                                    <FormField
                                                        control={form.control}
                                                        name="billingName"
                                                        render={({field}) => (
                                                            <FormItem>
                                                                <FormLabel>Name</FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        {...field}
                                                                        type="text"
                                                                        placeholder="John Doe"
                                                                    />
                                                                </FormControl>
                                                                <FormMessage/>
                                                                <FormDescription/>
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                                <div className="grid gap-2">
                                                    <FormField
                                                        control={form.control}
                                                        name="billingAddress"
                                                        render={({field}) => (
                                                            <FormItem>
                                                                <FormLabel>Billing Address</FormLabel>
                                                                <FormControl>
                                                                    <Textarea
                                                                        {...field}
                                                                        placeholder="123 Main St, Anytown USA"
                                                                    />
                                                                </FormControl>
                                                                <FormMessage/>
                                                                <FormDescription/>
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Payment Method</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-4">
                                        <FormField
                                            control={form.control}
                                            name="paymentMethod"
                                            render={({field}) => (
                                                <FormItem>
                                                    {/*<FormLabel>Payment Method</FormLabel>*/}
                                                    <FormControl>
                                                    <RadioGroup
                                                        value={paymentMethod}
                                                        onValueChange={handlePaymentMethodChange}
                                                        className="grid grid-cols-2 gap-4"
                                                    >
                                                        {paymentMethods.map((method) => (
                                                            <FormItem key={method.id}
                                                                      className="flex flex-col cursor-pointer items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                                                <RadioGroupItem
                                                                    id={method.id}
                                                                    value={method.id}
                                                                    className="peer  contain-style"
                                                                />
                                                                {method.icon}
                                                                {method.label}
                                                            </FormItem>
                                                        ))}
                                                    </RadioGroup>
                                                </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </CardContent>

                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Order Summary</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-4">
                                        <div className="flex items-center justify-between">
                                            <span>Subtotal</span>
                                            <span>$100.00</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span>Tax</span>
                                            <span>$10.00</span>
                                        </div>
                                        <Separator/>
                                        <div className="flex items-center justify-between font-bold">
                                            <span>Total</span>
                                            <span>$110.00</span>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button type="submit" className="w-full">
                                        Pay Now
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    )
}


export default SellerPaymentPage