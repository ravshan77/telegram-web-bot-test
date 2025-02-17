import { ColumnConfig } from "@/pages/formPage/types";

interface Props {
 columns: ColumnConfig[][];
 name: string
}

const THeader = ( {columns, name}: Props ) => {
  return (
    <thead>
      {columns.map((cols, colIndex) => (
          <tr key={`${name}-header-${colIndex}`}>
            { cols.map((col, ind) => (
               <th 
                key={`${name}-header-cell-${ind}`}  
                className={`border border-gray-300 bg-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700 ${col.className}`} 
                style={col.style}
                colSpan={col.colSpan}
                rowSpan={col.rowSpan}
               >
                {col.title}
               </th>
            ))
            }
          </tr>
      ))}
    </thead>
  );
};

export default THeader;
