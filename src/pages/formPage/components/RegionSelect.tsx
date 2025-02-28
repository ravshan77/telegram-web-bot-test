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
const RegionSelect = ({data, setData, loading, required, disabled, name}: Props) => {
  const [regionOptions, setRegionOptions] = useState([])
  const [loadingRegion, setLoading] = useState(loading)
    
  useEffect(() => {
    if (!data.state_id) {
       return 
    }
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://garant-hr.uz/api/anketa/state-regions/${data.state_id}`);
        const result = await response.json();
        setRegionOptions(result.data);
      } catch (error) {
        console.error("Error fetching states:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [data.state_id]);

  return (
    <CustomSelect 
      name={name} 
      loading={loading || loadingRegion}
      disabled={disabled || loadingRegion}
      options={regionOptions} 
      value={data.region_id}
      onChange={(target) => setData((prev_values) => ({ ...prev_values, ["region_id" as keyof Values]: target?.id }))} 
      required={required} 
    /> 
  )
}

export default RegionSelect