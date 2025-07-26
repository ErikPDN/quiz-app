"use client";
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export const UploadDoc = () => {
  const [document, setDucument] = useState<File | null | undefined>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!document) setError("Please upload the document first")
    setIsLoading(true)

    const formData = new FormData()
    formData.append("pdf", document as Blob)

    try {
      const res = await fetch("/api/quizz/generate", {
        method: "POST",
        body: formData
      })

      if (res.status === 200) {
        const data = await res.json()
        const quizzId = data.quizzId

        router.push(`/quizz/${quizzId}`)
      }
    } catch (e: any) {
      console.log("error while generating the quizz", e)
    }

    setIsLoading(false)
  }

  return (
    <div className="w-full flex justify-center">
      {isLoading ? <p>Loading...</p>
        :
        <form className="max-w-xl w-full" onSubmit={handleSubmit}>
          <label
            htmlFor="document"
            className="bg-secondary w-full flex h-20 rounded-md border-4 border-dashed border-zinc-500 relative cursor-pointer"
          >
            <div className="absolute inset-0 m-auto flex justify-center items-center">
              {document && document?.name ? document.name : "Drag a file"}
            </div>
            <input
              type="file"
              id="document"
              name="document"
              className="relative block w-full h-full z-50 
          opacity-0"
              onChange={(e) => setDucument(e?.target?.files?.[0])}
            />
          </label>
          {error ? <p className="text-red-500">{error}</p> : null}
          <div className="flex justify-center mt-5">
            <Button size="lg" className="mt-2" type="submit">Generate Quizz</Button>
          </div>
        </form>
      }
    </div>
  );
};
