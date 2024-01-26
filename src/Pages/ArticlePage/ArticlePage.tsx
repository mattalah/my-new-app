import { useEffect, useState } from "react";


import { Oval } from "react-loader-spinner";
import { useSearchParams } from "react-router-dom";

import { ArticleComponent } from "Components/ArticleComponent"
import { PaginatorComponent } from "Components/PaginatorComponent"
import { SearchComponent } from "Components/SearchComponent";
import { FilterComponent } from "Components/FilterComponent";

import { routes } from "Config/routes";
import { categories, sources } from "Config/constant";

import { getArticle } from "Service/ArticleService";



export const ArticlePage = () => {
    let [data, setData] = useState<{ data: any, meta: any }>();
    let [isLoading, setIsLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();

    const initialFilters = [
        {
            id: 'date',
            name: 'Date',
            type: 'date',
            value: null,
        },
        {
            id: 'category',
            name: 'Category',
            type: 'checkbox',
            options: categories.map(val => ({
                value: val, label: val, checked: false
            })),
        },
        {
            id: 'source',
            name: 'Source',
            type: 'checkbox',
            options: sources.map(val => ({
                value: val, label: val, checked: false
            })),
        }
    ]
    const [filters, setFilters] = useState<Filter[]>(initialFilters);

    useEffect(() => {

    }, [filters])
    const handleValueChange = (value: any, id: string, type: string, label?: string) => {
        setFilters((prev: Filter[]) => {
            return prev.map(filter => {
                if (filter.id == id) {
                    if (type == "checkbox") {
                        return {
                            ...filter, options: filter.options?.map(option => ({
                                ...option,
                                checked: label == option.label
                            }))
                        }
                    } else {
                        return { ...filter, value }
                    }
                } else {
                    return { ...filter }
                }
            })
        });
        console.log({ id })
        if (type == "checkbox" && searchParams.get(id)) {
            searchParams.set(id, `${searchParams.get(id)},${value}`)
            // setSearchParams({ [id]: `${searchParams.get(id)},${value}` })
        } else {
            searchParams.set(id, value)

            // setSearchParams({ [id]: value })
        }
        setSearchParams(searchParams)
    }

    useEffect(() => {
        setIsLoading(true)
        const getData = async () => {
            try {
                setIsLoading(false)
                setData(await getArticle(searchParams))
            } catch {
                setIsLoading(false)
            }
        }
        getData()
    }, [searchParams, filters])



    return (

        <div>
            <SearchComponent />
            <div className="relative min-h-screen flex md:flex-row flex-col">
                <div className="flex md:flex-col sm:flex-row mt-4 border-t border-gray-200 sidebar md:py-7 md:px-2">
                    <FilterComponent {...{ filters, handleValueChange }} />
                </div>
                <div className="flex flex-col w-full md:w-4/5 justify-center mx-auto">
                    {isLoading ? (
                        <Oval
                            visible={isLoading}
                            wrapperClass="flex justify-center items-center"
                            height="80"
                            width="80"
                            color="#805ad5"
                            secondaryColor="#D8D7D7"
                            ariaLabel="oval-loading"
                        />
                    ) : (
                        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {data?.data.map((article: Article) => (
                                <ArticleComponent {...{ article }} key={article.id} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <PaginatorComponent meta={data?.meta} page={routes.articles} {...{ searchParams }} />
        </div>
    )
}