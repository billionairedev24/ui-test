import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-yellow-400">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
                <p className="text-lg">The page you&apos;re looking for doesn&apos;t exist.</p>
                <Button asChild>
                    <Link href="/">Return Home</Link>
                </Button>
            </div>
        </div>
    );
}