import { Router, Request, Response } from "express";

const router = Router()

export interface FactResponse {
    fact: string;
  }
  

  
  /**
   * Fetches a fun fact from the API
   */
    export const fetchFact = async (): Promise<string> => {
    const API_URL = `https://api.api-ninjas.com/v1/facts`;
    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': `${process.env.VITE_FUN_FACTS_API_KEY}`, // Ensure type safety
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
  
      const data: FactResponse[] = await response.json();
      return data[0]?.fact || 'No fact available'; // Adjust based on your API response structure
    } catch (error) {
      console.error('Error fetching fact:', error);
      throw new Error('Oops! Something went wrong while fetching a fact.');
    }
  };


router.get('/', async (_req: Request, res: Response) => {
  try {
    const fact = await fetchFact()
    res.json({message: fact})
  } catch (error) {
    res.status(400).json({message: 'Unable to fetch fun fact'})
  }
  
})


export default router