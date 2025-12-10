
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

const freeFeatures = [
    "5 AI post generations per month",
    "Standard AI model",
    "Access to post library",
    "Content calendar",
];

const premiumFeatures = [
    "Unlimited AI post generations",
    "Advanced AI model for higher quality posts",
    "Priority support",
    "All features from the Free plan",
];

export default function UpgradePage() {
  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-3xl font-bold tracking-tight font-headline">Upgrade Your Plan</h1>
            <p className="text-muted-foreground">
                Unlock powerful features to supercharge your LinkedIn presence.
            </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Free Plan</CardTitle>
                    <CardDescription>For getting started and trying out our features.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="text-3xl font-bold">
                        $0<span className="text-sm font-normal text-muted-foreground">/month</span>
                    </div>
                    <ul className="space-y-2">
                        {freeFeatures.map(feature => (
                            <li key={feature} className="flex items-center">
                                <Check className="h-4 w-4 mr-2 text-green-500" />
                                <span className="text-muted-foreground">{feature}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
                <CardFooter>
                    <Button variant="outline" className="w-full" disabled>
                        Your Current Plan
                    </Button>
                </CardFooter>
            </Card>

            <Card className="border-2 border-primary shadow-lg">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Premium Plan</CardTitle>
                        <div className="bg-primary text-primary-foreground px-3 py-1 text-xs rounded-full font-semibold">BEST VALUE</div>
                    </div>
                    <CardDescription>For professionals and creators who want to maximize their impact.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="text-3xl font-bold">
                        $10<span className="text-sm font-normal text-muted-foreground">/month</span>
                    </div>
                    <ul className="space-y-2">
                        {premiumFeatures.map(feature => (
                             <li key={feature} className="flex items-center">
                                <Check className="h-4 w-4 mr-2 text-primary" />
                                <span className="text-foreground">{feature}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
                 <CardFooter>
                     <Button asChild className="w-full" variant="secondary">
                        {/* This would link to a Razorpay checkout page */}
                        <Link href="#">
                            Upgrade to Premium
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    </div>
  )
}
