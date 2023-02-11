// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

interface QuoteData {
  author: string,
  quote: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<QuoteData>
) {
  const {q, a} = await fetch('https://zenquotes.io/api/random')
    .then(res => res.text())
    .then(value => {
      const text = value.substring(1, value.length - 2);
      return JSON.parse(text);
    });

  res.status(200).json({author: a, quote: q});
}
