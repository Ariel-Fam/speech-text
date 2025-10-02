// app/subscribe/page.tsx
"use client";

import { SignedIn, SignedOut, SignInButton, PricingTable } from "@clerk/nextjs";
import Header from "@/components/Header";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function SubscribePage() {
  const reset = useMutation(api.credits.resetForCurrentMonth)
  const handleRefresh = async () => {
    try {
      await reset({})
    } catch (e) {
      console.error(e)
    }
  }
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
        <div className="mt-4">
          <button onClick={handleRefresh} className="rounded-xl px-4 py-2 border">Refresh monthly credits</button>
        </div>
        
      </SignedIn>
    </div>
  );
}
