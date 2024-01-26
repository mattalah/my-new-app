import React, { useCallback, useEffect, useState } from "react";

import { Oval } from "react-loader-spinner";
import { useSearchParams } from "react-router-dom";

import { ArticleComponent } from "Components/ArticleComponent";
import { PaginatorComponent } from "Components/PaginatorComponent";
import { SearchComponent } from "Components/SearchComponent";
import { FilterComponent } from "Components/FilterComponent";

import { getArticle } from "Service/ArticleService";

import { routes } from "Config/routes";
import { categories, sources } from "Config/constant";


export const ArticlePage: React.FC = () => {
    const [data, setData] = useState<{ data: Article[], meta: any }>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [filters, setFilters] = useState<Filter[]>([
        {
            id: 'date',
            name: 'Date',
            type: 'date',
        },
        {
            id: 'category',
            name: 'Category',
            type: 'checkbox',
            options: categories.map(({ value, label }) => ({ value, label, checked: false })),
        },
        {
            id: 'source',
            name: 'Source',
            type: 'checkbox',
            options: sources.map(({ value, label }) => ({ value, label, checked: false })),
        },
    ]);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await getArticle(searchParams);
                setData(response);
            } catch (error) {
                console.error('Error fetching articles:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
        updatedFilters(searchParams);
    }, [searchParams]);

    const updatedFilters = useCallback((searchParams: any) => setFilters(filters.map(filter => ({
        ...filter,
        value: filter.type === "date" ? searchParams.get(filter.id) : filter.value,
        options: filter.type === "checkbox" ? filter.options?.map(option => ({
            ...option,
            checked: searchParams.has(filter.id, option.value),
        })) : filter.options,
    }))), [])



    const handleValueChange = (value: any, id: string, type: string) => {
        const updatedSearchParams = new URLSearchParams(searchParams);
        if (!value || (type === "checkbox" && updatedSearchParams.has(id, value))) {
            updatedSearchParams.delete(id, value);
        }
        else {
            if (type === "checkbox") {
                updatedSearchParams.append(id, value);
            } else {
                updatedSearchParams.set(id, value);
            }
        }
        setSearchParams(updatedSearchParams);
    };

    return (
        <div>
            <SearchComponent />
            <div className="relative min-h-screen flex md:flex-row flex-col">
                <div className="flex md:flex-col sm:flex-row mt-4 border-t border-gray-200 sidebar md:py-7 md:px-2">
                    <FilterComponent filters={filters} handleValueChange={handleValueChange} />
                </div>
                <div className="flex flex-col w-full md:w-4/5 justify-center mx-auto">
                    {isLoading ? (
                        <Oval
                            visible={isLoading}
                            wrapperClass="flex justify-center items-center"
                            height={80}
                            width={80}
                            color="#805ad5"
                            secondaryColor="#D8D7D7"
                            ariaLabel="oval-loading"
                        />
                    ) : (
                        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {data?.data.map((article: Article) => (
                                <ArticleComponent article={article} key={article.id} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <PaginatorComponent meta={data?.meta} page={routes.articles} searchParams={searchParams} />
        </div>
    );
};
