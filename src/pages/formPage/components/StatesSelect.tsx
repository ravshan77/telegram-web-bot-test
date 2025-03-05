import { useEffect, useState } from 'react'
import CustomSelect from '@/components/Select'
import { SingleOption, Values } from '../types'
import { fetchRequest } from '@/utils/fetchRequest';

interface Props {
  data: Values,
  loading: boolean;
  disabled: boolean;
  required: boolean;
  name: keyof Values;
  setData: React.Dispatch<React.SetStateAction<Values>>,
}

const StatesSelect = ({data, setData, loading, required, disabled, name}: Props) => {
  const [loadingStates, setLoading] = useState(true)
  const [stateOptions, setStateOptions] = useState<SingleOption[]>([])
    
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await fetchRequest<{ data: SingleOption[] }>(`/anketa/states`)
        if (isMounted && response) {
          setStateOptions(response.data);
        }
      } catch (error) {
        alert(`Error fetching states (admin bilan bog'laning @paloncha): ${error}`);
      } finally{
        setLoading(false)
      }
    };

    fetchData();

    return () => {
      isMounted = false; // Component unmounted bo'lsa, state update qilinmaydi
    };


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