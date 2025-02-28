import CustomSelect from '@/components/Select'
import { useEffect, useState } from 'react'
import { Values } from '../types'

interface Props {
  data: Values,
  loading: boolean;
  disabled: boolean;
  required: boolean;
  name: keyof Values;
  setData: React.Dispatch<React.SetStateAction<Values>>,
}
const StatesSelect = ({data, setData, loading, required, disabled, name}: Props) => {
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
        alert(`Error fetching states: ${error instanceof Error ? error.message : error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <CustomSelect 
      name={name} 
      required={required} 
      value={data.state_id}
      options={stateOptions} 
      loading={loading || loadingStates}
      disabled={disabled || loadingStates}
      onChange={(target) => setData((prev_values) => ({ ...prev_values, ["state_id" as keyof Values]: String(target?.id), ["region_id" as keyof Values]: null }))} 
    /> 
  )
}

export default StatesSelect