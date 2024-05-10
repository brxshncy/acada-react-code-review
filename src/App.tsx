import { useState, useEffect } from "react";
import axios from "axios";

interface ISampleData {
    id: number | string;
    name: string;
}

const App = () => {
    const [data, setData] = useState<ISampleData[]>([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchSampleData = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://example.com/api/data");
            setData(response.data);
            setLoading(false);
        } catch (error: any) {
            setError(error.message || "An error occurred");
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchSampleData();

        return () => {};
    }, []);

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
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
