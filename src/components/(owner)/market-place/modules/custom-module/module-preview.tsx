import { CustomModuleSchema } from "@/types/custom-module";

const ModulePreview: React.FC<{ schema: CustomModuleSchema }> = ({ schema }) => {
    const layout = schema.layout[0];
  
    if (layout.type === "table") {
      return (
        <table className="border w-full mt-4">
          <thead>
            <tr className="capitalize">
              {layout.props.tableHeaders.map((h) => (
                <th key={h.key} className="border px-3 py-2">{h.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {layout.props.tableHeaders.map((h) => (
                <td key={h.key} className="border px-3 py-2 text-gray-400">
                  {h.type.toUpperCase()}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      );
    }
  
    if (layout.type === "card") {
      return (
        <div className="grid gap-4 mt-4 p-[1.5%] rounded-lg shadow-lg bg-white">
          {layout.props.fields.map((f) => (
            <div key={f.key} className="rounded md:w-[48%]">
              <span className="font-semibold">{f.label}:</span>
              <span className="text-gray-400 ml-2">{f.type.toUpperCase()}</span>
            </div>
          ))}
        </div>
      );
    }
  
    return null;
  };
  
  export default ModulePreview;