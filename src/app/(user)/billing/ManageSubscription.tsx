"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export const ManageSubscription = () => {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)

  const redirectToCostumerPortal = async () => {

    setLoading(true)

    try {
      const { url } = await fetch("/api/stripe/create-portal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
      }).then((res) => res.json())

      router.push(url.url)
    } catch (e) {
      console.log("Error", e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-end mt-10">
      <Button disabled={loading} onClick={redirectToCostumerPortal}>
        {
          loading ?
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Redirecting...
            </>
            :
            "Change Your Subscription"
        }
      </Button>
    </div>
  )
}
