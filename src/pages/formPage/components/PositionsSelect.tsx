import { Values } from '../types'
import { useEffect, useState } from 'react'
import MultiSelect from '@/components/MultiSelect'

interface Props {
  data: Values,
  setData: React.Dispatch<React.SetStateAction<Values>>,
}
const PositionsSelect = ({data, setData}: Props) => {
  const [positionsOptions, setPositionsOptions] = useState([])
  const [loading, setLoading] = useState(false)
    
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://garant-hr.uz/api/anketa/positons/for/telegram-bot");
        const result = await response.json();
        setPositionsOptions(result.data); 
      } catch (error) {
        console.error("Error fetching states:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <MultiSelect 
        name={"position"} 
        loading={loading}
        disabled={loading}
        options={positionsOptions} 
        value={data.position} 
        onChange={(target) => setData((prev_values) => ({ ...prev_values, ["position" as keyof Values]: target }))} 
        required 
      />
    </>
  )
}

export default PositionsSelect