"use client"
import { useState } from "react"
import { getStripe } from "@/lib/stripe-client"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

type Props = {
  userId?: string,
  price: string
}

export const SubscribeBtn = ({ userId, price }: Props) => {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)

  const handleCheckout = async (price: string) => {
    if (!userId) {
      router.push("/login")
    }

    setLoading(true)

    try {
      const { sessionId } = await fetch("/api/stripe/checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ price })
      }).then((res) => res.json())

      const stripe = await getStripe()
      stripe?.redirectToCheckout({ sessionId })
    } catch (e) {
      console.log("Subscribe Button Error", e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center mt-10">
      <button
        disabled={loading}
        onClick={() => handleCheckout(price)}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-600 to-red-700 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:scale-105 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading...
          </>
        ) : (
          "Upgrade Your Plan"
        )}
      </button>
    </div>
  )
}
