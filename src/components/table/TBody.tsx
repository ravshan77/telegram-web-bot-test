import { ColumnConfig, UuidId } from "@/pages/formPage/types";
import generateField from "./tdInput";

interface TBProps<T, U> {
  data: T[];
  name: keyof U;
  columns: ColumnConfig[][];
  setData: React.Dispatch<React.SetStateAction<U>>;
}

const TBody = <T extends UuidId, U>({data, columns, setData, name}: TBProps<T, U>) => {
  
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
  
  const deleteRow = (delete_row: T) => setData((prev) => ({ ...prev, [name]: (prev[name] as T[]).filter((row) => delete_row.uuid ? row.uuid !== delete_row.uuid : row.id !== delete_row.id ) }))
  const table_name = name as string;

  return (
    <tbody>
      {data.map((row, rowIndex) =>
        columns.map((cols) => (
          <tr key={`${table_name}-tbody-row-${rowIndex}`}>
            {cols.map((col, colIndex) => (
              <td
                colSpan={col.colSpan}
                rowSpan={col.rowSpan}
                key={`${table_name}-tbody-cell-${rowIndex}-${colIndex}`}
                className="text-sm border border-gray-300"
                style={col.style}
              >
                {generateField<T>({ col, row, deleteRow })}
              </td>
            ))}
          </tr>
        ))
      )}
    </tbody>
  );
};

export default TBody;
