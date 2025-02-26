import { Values } from '../types'
import { useEffect, useState } from 'react'
import MultiSelect from '@/components/MultiSelect'

interface Props {
  data: Values,
  loading: boolean;
  disabled: boolean;
  required: boolean;
  setData: React.Dispatch<React.SetStateAction<Values>>,
}
const PositionsSelect = ({data, setData, required, disabled, loading}: Props) => {
  const [positionsOptions, setPositionsOptions] = useState([])
  const [loadingPositions, setLoading] = useState(loading)
    
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://garant-hr.uz/api/anketa/positons/for/telegram-bot");
        const result = await response.json();
        setPositionsOptions(result.data); 
      } catch (error) {
        alert(`Error fetching positions: ${error instanceof Error ? error.message : error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
      key={"position"}
      name={"position"} 
      required={required} 
      value={data.position} 
      options={options} 
      loading={loading || loadingPositions}
      disabled={ disabled || loadingPositions}
      onChange={(target) => setData((prev_values) => ({ ...prev_values, ["position" as keyof Values]: target }))} 
    />
  )
}

export default PositionsSelect