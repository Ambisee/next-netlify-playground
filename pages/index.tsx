import { useEffect, useState } from "react"

interface QuoteData {
  author: string,
  quote: string
}

export default function Home() {
  const [quoteData, setQuoteData] = useState<QuoteData>({} as any)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const getQuote = async () => {
    setIsLoading(true)
    const result = await fetch('/api/random_quote').then(res => res.json())
    setQuoteData(result)
    setIsLoading(false)
  }

  return (
    <div>
      <button onClick={getQuote}>Get a random famous quote</button>
      <div>
        <h1>{quoteData.quote}</h1>
        <span>{quoteData.author}</span>
      </div>
      {isLoading && (
        <small>Loading...</small>
      )}
    </div>
  )
}
