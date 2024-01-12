

export const SearchComponent: React.FC<any> = () => {
    return <form className="max-w-6xl mx-auto flex justify-between items-center px-5 border-solid border-2 border-purple-500 border-collapse rounded-lg">
        <input type="text" placeholder="search keywords" className="w-full h-14 placeholder-gray-500 text-gray-500 outline-none flex-1 bg-transparent dark:text-purple-400" />
        <button className="text-purple-400 disabled:text-gray-400 capitalize">search</button>
    </form>



}