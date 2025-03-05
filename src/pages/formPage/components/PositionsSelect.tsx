import { useEffect, useState } from 'react'
import { PositionsTypes, Values } from '../types'
import MultiSelect from '@/components/MultiSelect'
import { fetchRequest } from '@/utils/fetchRequest';

interface Props {
  data: Values,
  loading: boolean;
  disabled: boolean;
  required: boolean;
  name: keyof Values;
  setData: React.Dispatch<React.SetStateAction<Values>>,
}
const PositionsSelect = ({data, setData, required, disabled, loading, name}: Props) => {
  const [loadingPositions, setLoading] = useState(true)
  const [positionsOptions, setPositionsOptions] = useState<PositionsTypes[]>([])
    
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await fetchRequest<{ data: PositionsTypes[] }>("/anketa/positons/for/telegram-bot");
        if (isMounted && response) {
          setPositionsOptions(response.data); 
        }
      } catch (error) {
        alert(`Error fetching positions: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false; // Component unmounted bo'lsa, state update qilinmaydi
    };
  }, []);


  // deafult options
  const base_branch_women_positions = [
    { label: "Оператор", value: "Оператор", id: 11 },
    { label: "Сотувчи", value: "Сотувчи", id: 1 },
    { label: "Фаррош", value: "Фаррош", id: 8 },
    { label: "Бухгалтерия", value: "Бухгалтерия", id: 12 },
    { label: "Ошпаз", value: "Ошпаз", id: 9 },
  ]
  const other_branch_women_positions = [
    { label: "Сотувчи", value: "Сотувчи", id: 1 },
    { label: "Фаррош", value: "Фаррош", id: 8 },
    { label: "Ошпаз", value: "Ошпаз", id: 9 },
  ]  
  // check options gender with base branch (barnch_id === "1" === base branch)
  const options = (data?.branch_id === "1") ? (data?.gender === "2")  ? base_branch_women_positions : positionsOptions : (data?.gender === "2") ? other_branch_women_positions : positionsOptions

  return (
    <MultiSelect 
      name={name} 
      options={options} 
      required={required} 
      value={data.position} 
      loading={loading || loadingPositions}
      disabled={ disabled || loadingPositions}
      onChange={(target) => setData((prev_values) => ({ ...prev_values, ["position" as keyof Values]: target }))} 
    />
  )
}

export default PositionsSelect