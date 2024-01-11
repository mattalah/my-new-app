import { useQuery } from "@tanstack/react-query";
import { ArticleComponent } from "Components/ArticleComponent"
import { PaginationComponent } from "Components/PaginationComponent"
import { SearchComponent } from "Components/SearchComponent";
import { getArticle } from "Service/ArticleService";

export const ArticlePage = () => {
    // Queries
    const { data, error, isLoading } = useQuery({ queryKey: ['articles'], queryFn: getArticle })
    const links = [
        {
            link: "ini",
            number: 1,
            isActive: true
        },
        {
            link: "ini",
            number: 2,
            isActive: false
        }];
    return <div>
        <SearchComponent />
        <div className="flex items-center justify-center min-h-screen container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {isLoading ? "loading" : data.data.map((article: Article) => <ArticleComponent {...{ article }} key={article.id} />)}
            </div>
        </div >
        <PaginationComponent total={20} to={15} from={15} {...{ links }} />

    </div >
}