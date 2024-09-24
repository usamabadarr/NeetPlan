
export interface FactResponse {
    fact: string;
  }
  
  const API_URL = `https://api.api-ninjas.com/v1/facts`;
  
  /**
   * Fetches a fun fact from the API
   */
  export const fetchFact = async (): Promise<string> => {
    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': import.meta.env.VITE_FUN_FACTS_API_KEY as string, // Ensure type safety
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