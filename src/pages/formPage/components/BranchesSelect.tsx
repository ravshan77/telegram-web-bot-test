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
        console.error("Error fetching states:", error);
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
      onChange={(target) => setData((prev_values) => ({ ...prev_values, ["branch_id" as keyof Values]: target?.id }))} 
      required={required} 
    /> 
  )
}

export default BranchesSelect