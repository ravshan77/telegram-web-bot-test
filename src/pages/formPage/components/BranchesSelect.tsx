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

const BranchesSelect = ({data, setData, required, disabled, loading, name}: Props) => {
  const [loadingBranches, setLoading] = useState(true)
  const [branchesOptions, setBranchesOptions] = useState<SingleOption[]>([])
    
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await fetchRequest<{ data: SingleOption[] }>(`/anketa/branches`)
        if (isMounted && response) {
          setBranchesOptions(response.data);
        }
      } catch (error) {
        alert(`Error fetching branches (admin bilan bog'laning @paloncha): ${error}`);
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
      value={data.branch_id}
      options={branchesOptions} 
      loading={loading || loadingBranches}
      disabled={disabled || loadingBranches}
      onChange={(target) => setData((prev_values) => ({ ...prev_values, ["branch_id" as keyof Values]: String(target?.id) }))} 
    /> 
  )
}

export default BranchesSelect