"use client";

import { Button } from "@/components/ui/button";
import { Home, RefreshCw, XCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PaymentCanceledPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gradient-to-b from-brown-50 to-white flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="flex justify-center mb-6">
                    <div className="bg-red-100 p-3 rounded-full">
                        <XCircle className="h-12 w-12 text-red-600" />
                    </div>
                </div>
                <h1 className="text-2xl font-bold text-brown-900 mb-2">Payment Canceled</h1>
                <p className="text-brown-600 mb-6">
                    Your payment was canceled. No charges were made to your account.
                </p>
                <div className="bg-brown-50 p-4 rounded-lg mb-6">
                    <p className="text-sm text-brown-600">
                        If you encountered any issues or would like to try again, please contact our support team.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                        onClick={() => router.back()}
                        className="w-full sm:w-auto bg-brown-600 hover:bg-brown-700"
                    >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Try Again
                    </Button>
                    <Link href="/">
                        <Button variant="outline" className="w-full sm:w-auto border-brown-200 text-brown-700 hover:bg-brown-50">
                            <Home className="h-4 w-4 mr-2" />
                            Return Home
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
} 