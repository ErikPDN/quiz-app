"use client";
import { useState } from "react"
import { Button } from "@/components/ui/button"

export const UploadDoc = () => {
  const [document, setDucument] = useState<File | null | undefined>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true)

    console.log(document)
  }

  return (
    <div className="w-full flex justify-center">
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
        <Button size="lg" className="mt-2" type="submit">Generate Quizz</Button>
      </form>
    </div>
  );
};
