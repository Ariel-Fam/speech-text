"use client"
import { Authenticated, Unauthenticated, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Progress } from "./ui/progress"
import { Badge } from "./ui/badge"

function AuthCreditsCard() {
  const remaining = useQuery(api.credits.getRemaining, {})
  const total = 20
  const value = typeof remaining === "number" ? remaining : total
  const percent = Math.max(0, Math.min(100, Math.round((value / total) * 100)))
  return (
    <Card className="w-80 sm:max-w-lg">
      <CardHeader>
        <CardTitle className="text-base sm:text-lg">Credits</CardTitle>
        <CardDescription className="text-xs sm:text-sm">Your monthly allowance for generations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-xs sm:text-sm text-muted-foreground">Remaining</div>
          <Badge variant={value === 0 ? "destructive" : "secondary"}>
            {remaining === undefined ? "Loading" : `${value} / ${total}`}
          </Badge>
        </div>
        <div className="mt-2">
          <Progress className="h-1.5 sm:h-2" value={percent} />
        </div>
        <div className="mt-2 text-[11px] sm:text-xs text-muted-foreground">
          {value === 0 ? "You’ve used all free credits. Subscribe to continue." : `${percent}% left`}
        </div>
      </CardContent>
    </Card>
  )
}

function UnauthCreditsCard() {
  return (
    <Card className="w-full max-w-md sm:max-w-lg">
      <CardHeader>
        <CardTitle className="text-base sm:text-lg">Credits</CardTitle>
        <CardDescription className="text-xs sm:text-sm">Your monthly allowance for generations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-xs sm:text-sm text-muted-foreground">Remaining</div>
          <Badge variant="secondary">Sign in</Badge>
        </div>
        <div className="mt-2">
          <Progress className="h-1.5 sm:h-2" value={0} />
        </div>
        <div className="mt-2 text-[11px] sm:text-xs text-muted-foreground">
          Sign in to view your credits.
        </div>
      </CardContent>
    </Card>
  )
}

export default function CreditsBanner() {
  return (
    <div className="py-4 sm:py-8 px-3 sm:px-0">
      <Authenticated>
        <AuthCreditsCard />
      </Authenticated>
      <Unauthenticated>
        <UnauthCreditsCard />
      </Unauthenticated>
    </div>
  )
}


