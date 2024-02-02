const fetchQuote = async (category: string): Promise<QuoteDto | null> => {
    const apiKey = 'AFVh0F/Nr8wbDi3UzQdkBQ==U131KAFWQT5vr2s4';

    try {
        const response = await fetch(`https://api.api-ninjas.com/v1/quotes?category=${category}`, {
            method: 'GET',
            headers: {
                'X-Api-Key': apiKey,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const result: QuoteDto = await response.json();
        return result.length > 0 ? result : null; // Check if the array is not empty
    } catch (error:Error) {
        throw new Error(`API request failed: ${error.message}`);
    }
};

export default fetchQuote;
