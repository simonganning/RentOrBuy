

export const fetchRateAPI = async () => {
    try {
        const response = await fetch('https://api.riksbank.se/swestr/v1/latest/SWESTR', {
            method: 'GET',
            headers: {
                'Cache-Control': 'no-cache'     
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return Object.entries(data)[0]; 

    } catch (error) {
        console.error("Fetch error:", error.message);
        return ["Error", "Fetching failed"];
    }
};
export const fetchPropertyIndexAPI = async () => {
    try {
        const response = await fetch('https://api.scb.se/OV0104/v1/doris/sv/ssd/START/BO/BO0501/BO0501X/NTBO0501A', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            },
            body: JSON.stringify({
                "query": [
                    {
                        "code": "ContentsCode",
                        "selection": {
                            "filter": "item",
                            "values": ["000001DN"]
                        }
                    }
                ],
                "response": {
                    "format": "json"
                }
            })
        });

        console.log(`HTTP Status: ${response.status}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        // make year and value key value pairs
        const extractedData = data.data.map(entry => ({
            value: entry.values[0],
            year: entry.key[1]  // Year is the second value in `key` array
        }));

        // return the data
        return extractedData;

    } catch (error) {
        console.error("Fetch error:", error.message);
        return [];
    }
};

export const calculateYearlyGrowth = (data) => {

        // map creates an array with every element
        // skip first element (will be 0 with slice.(1))
        const growthData = data.slice(1).map((entry, index) => {
        const previousValue = parseFloat(data[index].value); // prev year 
        const currentValue = parseFloat(entry.value); // curr yeart

        // percentage of old and new dat 
        const growthPercentage = ((currentValue - previousValue) / previousValue) * 100;

        // exctract year and percentgae and round to 2 decimals
        return { year: entry.year, growthPercentage: growthPercentage.toFixed(2) };
    });
    return growthData;
};
