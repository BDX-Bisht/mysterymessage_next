"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MessageSquare, Shield, Users, Sparkles } from "lucide-react";

export default function page() {
    return (
        <div className="min-h-screen bg-linear-to-br from-background to-muted/20">
            {/* Hero Section */}
            <div className="container mx-auto px-4 py-16 text-center">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <MessageSquare className="h-12 w-12 text-primary" />
                        <h1 className="text-5xl md:text-7xl font-bold bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                            Mystery Message
                        </h1>
                    </div>

                    <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                        Send anonymous messages to your friends, colleagues, or
                        anyone you know. Express yourself freely without
                        revealing your identity.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                        <Link href="/sign-up">
                            <Button
                                size="lg"
                                className="w-full sm:w-auto px-8 py-3 text-lg"
                            >
                                Get Started
                            </Button>
                        </Link>
                        <Link href="/sign-in">
                            <Button
                                variant="outline"
                                size="lg"
                                className="w-full sm:w-auto px-8 py-3 text-lg"
                            >
                                Sign In
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Why Choose Mystery Message?
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Discover the power of anonymous communication with our
                        secure and user-friendly platform.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    <Card className="border-2 hover:border-primary/50 transition-colors">
                        <CardHeader className="text-center">
                            <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                            <CardTitle className="text-xl">
                                Complete Anonymity
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-center">
                                Your identity is fully protected. Send messages
                                without anyone knowing it's you.
                            </CardDescription>
                        </CardContent>
                    </Card>

                    <Card className="border-2 hover:border-primary/50 transition-colors">
                        <CardHeader className="text-center">
                            <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                            <CardTitle className="text-xl">
                                Connect Freely
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-center">
                                Reach out to friends, colleagues, or
                                acquaintances without the pressure of identity.
                            </CardDescription>
                        </CardContent>
                    </Card>

                    <Card className="border-2 hover:border-primary/50 transition-colors">
                        <CardHeader className="text-center">
                            <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
                            <CardTitle className="text-xl">
                                Easy to Use
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-center">
                                Simple interface designed for quick and seamless
                                anonymous messaging.
                            </CardDescription>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Separator className="my-16" />

            {/* How It Works Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        How It Works
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Get started with Mystery Message in just a few simple
                        steps.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white dark:text-black text-2xl font-bold mx-auto mb-4">
                                1
                            </div>
                            <h3 className="text-xl font-semibold mb-2">
                                Sign Up
                            </h3>
                            <p className="text-muted-foreground">
                                Create your account with a unique username to
                                start receiving messages.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white dark:text-black text-2xl font-bold mx-auto mb-4">
                                2
                            </div>
                            <h3 className="text-xl font-semibold mb-2">
                                Share Your Link
                            </h3>
                            <p className="text-muted-foreground">
                                Share your unique mystery message link with
                                friends and contacts.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white dark:text-black text-2xl font-bold mx-auto mb-4">
                                3
                            </div>
                            <h3 className="text-xl font-semibold mb-2">
                                Send & Receive
                            </h3>
                            <p className="text-muted-foreground">
                                Send anonymous messages and check your inbox for
                                mysterious communications.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="container mx-auto px-4 py-16">
                <Card className="max-w-2xl mx-auto bg-linear-to-r from-primary/10 to-primary/5 border-primary/20">
                    <CardContent className="text-center p-8">
                        <h3 className="text-2xl md:text-3xl font-bold mb-4">
                            Ready to Start?
                        </h3>
                        <p className="text-muted-foreground mb-6">
                            Join thousands of users who are already sending
                            mystery messages.
                        </p>
                        <Link href="/sign-up">
                            <Button size="lg" className="px-8 py-3 text-lg">
                                Create Your Account
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
