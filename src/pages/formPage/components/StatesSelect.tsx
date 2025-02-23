import CustomSelect from '@/components/Select'
import { useEffect, useState } from 'react'
import { Values } from '../types'

interface Props {
  data: Values,
  setData: React.Dispatch<React.SetStateAction<Values>>,
}
const StatesSelect = ({data, setData}: Props) => {
  const [stateOptions, setStateOptions] = useState([])
  const [loading, setLoading] = useState(false)
    
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://garant-hr.uz/api/anketa/states");
        const result = await response.json();
        setStateOptions(result.data); 
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
      <CustomSelect 
        name={"state_id"} 
        loading={loading}
        key={"state_id"}
        disabled={loading}
        options={stateOptions} 
        value={data.state_id}
        onChange={(target) => setData((prev_values) => ({ ...prev_values, ["state_id" as keyof Values]: target?.id, ["region_id" as keyof Values]: null }))} 
        required 
      /> 
    </>
  )
}

export default StatesSelect