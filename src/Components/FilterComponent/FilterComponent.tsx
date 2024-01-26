
import Datepicker from "react-tailwindcss-datepicker";


interface FilterComponentProps {
    filters: Filter[],
    handleValueChange: (value: any, id: string, type: string, label?: string) => void
}
export const FilterComponent: React.FC<FilterComponentProps> = ({ filters, handleValueChange }) => {

    return (
        filters.map((section) => (
            <div key={section.id} className=" border-gray-200 px-4 py-6">
                <h3 className="px-4 py-3 border-b border-gray-200">
                    <button className="w-full text-left font-medium text-gray-900 hover:text-gray-500 focus:outline-none">
                        {section.name}
                    </button>
                </h3>
                <div className="p-6">
                    <div className="space-y-6">
                        {section.type === "checkbox" && section.options?.map((option, optionIdx) => (
                            <div key={option.value} className="flex items-center">
                                <input
                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    onChange={(e) => handleValueChange(e.target.value, section.id, "checkbox", option.label)}
                                    type={section.type}
                                    defaultChecked={option.checked}
                                    className="w-4 h-4 rounded border-gray-300 accent-purple-600 focus:ring-purple-500"
                                />
                                <label
                                    htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                    className="ml-3 min-w-0 flex-1 text-gray-500"
                                >
                                    {option.label}
                                </label>
                            </div>
                        ))}
                        {section.type === "date" && (
                            <div className="flex items-center">
                                <Datepicker
                                    value={{ startDate: section.value!, endDate: section.value! }}
                                    asSingle={true}
                                    primaryColor="purple"
                                    onChange={(value) => handleValueChange(value?.startDate, section.id, "date")}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        ))
    )

}