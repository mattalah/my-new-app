
interface FilterComponentProps {
    category: string
}
export const FilterComponent: React.FC<FilterComponentProps> = ({ category }) => {
    return <button className="capitalize hover:scale-110 transition-transform duration-200 ease-out rounded-lg text-center p-1 border-solid border-2 hover:border-purple-500 border-gray-500 hover:text-purple-500 text-gray-500">
        {category}
    </button>
}