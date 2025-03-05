import CustomSelect from '@/components/Select'
import { useEffect, useState } from 'react'
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
const RegionSelect = ({data, setData, loading, required, disabled, name}: Props) => {
  const [loadingRegion, setLoading] = useState(true)
  const [regionOptions, setRegionOptions] = useState<SingleOption[]>([])
  
  const state_id = data?.state_id

  useEffect(() => {
    if (!state_id) {
       return 
    }

    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await fetchRequest<{ data: SingleOption[] }>(`/anketa/state-regions/${state_id}`)
        if (isMounted && response) {
          setRegionOptions(response.data);
        }
      } catch (error) {
        alert(`Error fetching regions (admin bilan bog'laning @paloncha): ${error}`);
      } finally{
        setLoading(false)
      }
    };

    fetchData();

    return () => {
      isMounted = false; // Component unmounted bo'lsa, state update qilinmaydi
    };
  }, [state_id]);

  return (
    <CustomSelect 
      name={name} 
      required={required} 
      value={data.region_id}
      options={regionOptions} 
      loading={loading || loadingRegion || !state_id}
      disabled={disabled || loadingRegion}
      onChange={(target) => setData((prev_values) => ({ ...prev_values, ["region_id" as keyof Values]: target?.id }))} 
    /> 
  )
}

export default RegionSelect