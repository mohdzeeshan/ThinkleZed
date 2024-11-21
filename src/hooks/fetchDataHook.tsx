import {useState, useEffect} from 'react'
import axios from 'axios';

export const useFetchPopulationData = () => {
    const [data, setData] = useState<PopulationDataItem[]>([]);
  
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get<PopulationResponse>(
            'https://datausa.io/api/data?drilldowns=Nation&measures=Population',
          );
          let data = response.data.data.sort(
            (a, b) => parseInt(a.Year) - parseInt(b.Year),
          );
  
          const yearsAndPopulations = data.map(item => ({
            Year: item.Year,
            Population: item.Population,
          }));
          setData(yearsAndPopulations)
  
        } catch (err) {
          setError(err as Error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    return {data, loading, error};
  };