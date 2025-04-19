"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, Home, Package } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentSuccessPage() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading state
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-brown-50 to-white flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <div className="w-16 h-16 border-4 border-brown-200 border-t-brown-600 rounded-full animate-spin"></div>
                        <p className="text-brown-600 font-medium">Processing your payment...</p>
                    </div>
                ) : (
                    <>
                        <div className="flex justify-center mb-6">
                            <div className="bg-green-100 p-3 rounded-full">
                                <CheckCircle className="h-12 w-12 text-green-600" />
                            </div>
                        </div>
                        <h1 className="text-2xl font-bold text-brown-900 mb-2">Payment Successful!</h1>
                        <p className="text-brown-600 mb-6">
                            Thank you for your purchase. Your order has been confirmed and is being processed.
                        </p>
                        <div className="bg-brown-50 p-4 rounded-lg mb-6">
                            <div className="flex items-center justify-center mb-2">
                                <Package className="h-5 w-5 text-brown-600 mr-2" />
                                <span className="text-brown-700 font-medium">Order Details</span>
                            </div>
                            <p className="text-sm text-brown-600">
                                Session ID: {sessionId ? `${sessionId.substring(0, 8)}...` : "N/A"}
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link href="/account/orders">
                                <Button className="w-full sm:w-auto bg-brown-600 hover:bg-brown-700">
                                    View Orders
                                </Button>
                            </Link>
                            <Link href="/">
                                <Button variant="outline" className="w-full sm:w-auto border-brown-200 text-brown-700 hover:bg-brown-50">
                                    <Home className="h-4 w-4 mr-2" />
                                    Return Home
                                </Button>
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
} 