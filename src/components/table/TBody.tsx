import { ColumnConfig, UuidId, Values } from "@/pages/formPage/types";
import generateField from "./tdInput";
import { isArray } from "lodash";

interface TBProps<T> {
  data: T[];
  name: keyof Values;
  columns: ColumnConfig[][];
  setData: React.Dispatch<React.SetStateAction<Values>>;
}

const TBody = <T extends UuidId>({data, columns, setData, name}: TBProps<T>) => {
  
  if (data.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan={columns.flat().length} className="text-sm text-center py-4 text-gray-500">
            Ma'lumotlar kiritilmagan.
            <br />
            (Kiritish uchun '+' tugmasini bosing)
          </td>
        </tr>
      </tbody>
    );
  }
  
  const deleteRow = (delete_row: T) => {
    setData((prev) => {
      if (!isArray(prev[name])) {
        return prev
      }
      return ({ 
        ...prev, 
        [name]: (prev[name] as T[]).filter((row) => delete_row.uuid ? row.uuid !== delete_row.uuid : row.id !== delete_row.id ) })
    })

  }
  
  return (
    <tbody>
      {data.map((row, rowIndex) =>
        columns.map((cols) => (
          <tr key={`${name}-tbody-row-${rowIndex}`}>
            {cols.map((col, colIndex) => (
              <td
                colSpan={col.colSpan}
                rowSpan={col.rowSpan}
                key={`${name}-tbody-cell-${rowIndex}-${colIndex}`}
                className="text-sm border border-gray-300"
                style={col.style}
              >
                {generateField<T>({ col, row, deleteRow, name: name })}
              </td>
            ))}
          </tr>
        ))
      )}
    </tbody>
  );
};

export default TBody;
