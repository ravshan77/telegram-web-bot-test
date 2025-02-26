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
const BranchesSelect = ({data, setData, required, disabled, loading}: Props) => {
  const [branchesOptions, setBranchesOptions] = useState([])
  const [loadingBranches, setLoading] = useState(loading)
    
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://garant-hr.uz/api/anketa/branches");
        const result = await response.json();
        setBranchesOptions(result.data); 
      } catch (error) {
        alert(`Error fetching branches: ${error instanceof Error ? error.message : error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <CustomSelect 
      name={"branch_id"} 
      loading={loading || loadingBranches}
      disabled={disabled || loadingBranches}
      options={branchesOptions} 
      value={data.branch_id}
      onChange={(target) => setData((prev_values) => ({ ...prev_values, ["branch_id" as keyof Values]: String(target?.id) }))} 
      required={required} 
    /> 
  )
}

export default BranchesSelect