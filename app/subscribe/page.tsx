// app/subscribe/page.tsx
"use client";

import { SignedIn, SignedOut, SignInButton, PricingTable } from "@clerk/nextjs";
import Header from "@/components/Header";

export default function SubscribePage() {
  return (
    <div className="max-w-md mx-auto py-12">


        <div className="flex flex-col items-center">

            <Header />
            <SignedOut>
                <SignInButton fallbackRedirectUrl="/subscribe">
                <button className="rounded-xl px-4 py-2 border">Sign in to subscribe</button>
                </SignInButton>
            </SignedOut>
        </div>


      <SignedIn>
        {/* Required: planId = your cplan_xxx from Clerk Billing */}

        <PricingTable />
        
      </SignedIn>
    </div>
  );
}
