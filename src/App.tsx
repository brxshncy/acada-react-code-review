import { useState, useEffect } from "react";
import axios from "axios";

// Define the structure of the data fetched from the API
interface ISampleData {
    id: number | string;
    name: string;
}

const App = () => {
    // State variables for data, error, and loading status
    const [data, setData] = useState<ISampleData[]>([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchSampleData = async () => {
        setLoading(true); // Set loading to true before making the request
        try {
            // Fetch data from the API
            const response = await axios.get("http://example.com/api/data");
            setData(response.data); // Set the fetched data
            setLoading(false); // Set loading to false after successful data fetch
        } catch (error: any) {
            setError(error.message || "An error occurred"); // Set error message if request fails
            setLoading(false); // Set loading to false in case of error
        }
    };
    useEffect(() => {
        fetchSampleData(); // Call fetchSampleData function when the component mounts

        // Cleanup function (not needed in this case)
        return () => {};
    }, []);

    return (
        <div>
            {/* Show loading message if data is being fetched */}
            {loading && <p>Loading...</p>}
            {/* Show error message if there's an error */}
            {error && <p>Error: {error}</p>}{" "}
            {/* Render the data if available */}
            {data && (
                <ul>
                    {data.map((item) => (
                        <li key={item.id}>{item.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default App;
