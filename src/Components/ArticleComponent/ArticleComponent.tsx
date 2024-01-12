

export const ArticleComponent: React.FC<{ article: Article }> = ({ article }) => {
    return <div className="p-2 m-5 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">

        <img className="object-cover rounded-xl" src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=750&amp;q=80" alt="" />
        <div className="p-2">
            <h2 className="font-bold text-lg mb-2 ">{article.title}</h2>
            <p className="text-sm text-gray-600 truncate">{article.description}</p>
        </div>
        <div className="m-2">
            <a role="button" href="#" className="text-white bg-purple-600 px-4 py-2 rounded-md hover:bg-purple-700">Learn More</a>
        </div>
    </div>



}