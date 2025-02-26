import { Values } from '../types'
import { useEffect, useState } from 'react'
import MultiSelect from '@/components/MultiSelect'

interface Props {
  data: Values,
  loading: boolean;
  disabled: boolean;
  required: boolean;
  setData: React.Dispatch<React.SetStateAction<Values>>,
}
const PositionsSelect = ({data, setData, required, disabled, loading}: Props) => {
  const [positionsOptions, setPositionsOptions] = useState([])
  const [loadingPositions, setLoading] = useState(loading)
    
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
    <MultiSelect 
      key={"position"}
      name={"position"} 
      required={required} 
      value={data.position} 
      options={positionsOptions} 
      loading={loading || loadingPositions}
      disabled={ disabled || loadingPositions}
      onChange={(target) => setData((prev_values) => ({ ...prev_values, ["position" as keyof Values]: target }))} 
    />
  )
}

export default PositionsSelect