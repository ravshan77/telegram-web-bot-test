import CustomSelect from '@/components/Select'
import { useEffect, useState } from 'react'
import { Values } from '../types'

interface Props {
  data: Values,
  loading: boolean;
  disabled: boolean;
  required: boolean;
  setData: React.Dispatch<React.SetStateAction<Values>>,
}
const StatesSelect = ({data, setData, loading, required, disabled}: Props) => {
  const [stateOptions, setStateOptions] = useState([])
  const [loadingStates, setLoading] = useState(loading)
    
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
    <CustomSelect 
      key={"state_id"}
      name={"state_id"} 
      required={required} 
      value={data.state_id}
      options={stateOptions} 
      loading={loading || loadingStates}
      disabled={disabled || loadingStates}
      onChange={(target) => setData((prev_values) => ({ ...prev_values, ["state_id" as keyof Values]: target?.id, ["region_id" as keyof Values]: null }))} 
    /> 
  )
}

export default StatesSelect