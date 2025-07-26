import { UploadDoc } from "./UploadDoc";
import { auth, signIn } from "@/auth";
import { getUserSubscription } from "@/app/actions/userSubscription";
import { Lock, Flame, Sparkles, BookOpen, Zap, Currency } from "lucide-react";
import { PRICE_ID } from "@/lib/utils";
import { stripe } from "@/lib/stripe";
import { SubscribeBtn } from "@/app/(user)/billing/SubscribeBtn";

const page = async () => {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) {
    signIn()
    return
  }

  const subscribed: boolean | undefined | null = await getUserSubscription({ userId })
  let priceData = null;

  if (subscribed) {
    try {
      const price = await stripe.prices.retrieve(
        PRICE_ID,
      )

      priceData = {
        id: price.id,
        amount: (price.unit_amount || 0) / 100,
        currency: price.currency.toUpperCase(),
        interval: price.recurring?.interval,
        productName: (price.product as any).name
      }
    } catch (e) {
      console.error("Failed to fetch Stripe price:", e)
    }
  }

  return (
    <div className="min-h-screen bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm flex flex-col">
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-4xl mx-auto">
          {subscribed ? (
            <>
              {/* Header Section */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full mb-6 shadow-lg shadow-blue-500/25">
                  <BookOpen className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-indigo-300 bg-clip-text text-transparent mb-4">
                  What do you want to be quizzed about today?
                </h1>
                <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                  Upload your documents and let AI create personalized quizzes to test your knowledge
                </p>
              </div>

              {/* Upload Section */}
              <div className="bg-slate-800 rounded-3xl shadow-xl border border-slate-700 p-8 mb-8 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
                <UploadDoc />
              </div>

              {/* Features Grid */}
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <div className="bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 border border-slate-700">
                  <div className="w-12 h-12 bg-blue-900/50 rounded-xl flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Instant Generation</h3>
                  <p className="text-slate-300 text-sm">AI creates quizzes from your documents in seconds</p>
                </div>

                <div className="bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300 border border-slate-700">
                  <div className="w-12 h-12 bg-green-900/50 rounded-xl flex items-center justify-center mb-4">
                    <Sparkles className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Smart Questions</h3>
                  <p className="text-slate-300 text-sm">Personalized questions based on your content</p>
                </div>

                <div className="bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 border border-slate-700">
                  <div className="w-12 h-12 bg-purple-900/50 rounded-xl flex items-center justify-center mb-4">
                    <BookOpen className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Any Document</h3>
                  <p className="text-slate-300 text-sm">Support for PDFs, Word docs, and more</p>
                </div>
              </div>
            </>
          ) : (
            /* Subscription Required Section */
            <div className="text-center">
              <div className="bg-slate-800 rounded-3xl shadow-2xl border border-slate-700 p-12 max-w-2xl mx-auto relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-red-900/20 to-pink-900/20 opacity-80"></div>
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-orange-600/20 to-red-600/20 rounded-full opacity-30"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-br from-pink-600/20 to-red-600/20 rounded-full opacity-30"></div>

                <div className="relative z-10">
                  {/* Lock Icon */}
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-600 to-red-700 rounded-full mb-8 shadow-lg shadow-orange-500/25">
                    <Lock className="w-10 h-10 text-white" />
                  </div>

                  {/* Heading */}
                  <h2 className="text-4xl font-bold text-white mb-4">
                    Unlock Premium Features
                  </h2>

                  {/* Subtitle */}
                  <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                    Subscribe to upload documents and generate unlimited AI-powered quizzes
                  </p>

                  {/* Features List */}
                  <div className="text-left mb-10 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-green-900/50 rounded-full flex items-center justify-center">
                        <Sparkles className="w-3 h-3 text-green-400" />
                      </div>
                      <span className="text-slate-200">Upload unlimited documents</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-green-900/50 rounded-full flex items-center justify-center">
                        <Sparkles className="w-3 h-3 text-green-400" />
                      </div>
                      <span className="text-slate-200">Generate unlimited quizzes</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-green-900/50 rounded-full flex items-center justify-center">
                        <Sparkles className="w-3 h-3 text-green-400" />
                      </div>
                      <span className="text-slate-200">Advanced AI question generation</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-green-900/50 rounded-full flex items-center justify-center">
                        <Sparkles className="w-3 h-3 text-green-400" />
                      </div>
                      <span className="text-slate-200">Priority support</span>
                    </div>
                  </div>

                  {/* Upgrade Button */}
                  {priceData ? (
                    <>
                      <SubscribeBtn price={priceData.id} userId={userId} />
                      <p className="text-sm text-slate-400 mt-4">
                        Starting at {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: priceData.currency }).format(priceData.amount)}/{priceData.interval === 'month' ? 'month' : 'year'} • Cancel anytime
                      </p>
                    </>
                  ) : (
                    <p className="text-lg text-orange-400">Plan currently unavailable.</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default page;
