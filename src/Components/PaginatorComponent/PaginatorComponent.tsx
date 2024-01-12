import { useMemo } from "react";
import { NavLink } from "react-router-dom";

interface PaginatorComponentProps {
    meta: any;
    searchParams: any;
    page: string;
}

export const PaginatorComponent: React.FC<PaginatorComponentProps> = ({ meta, page, searchParams }) => {

    const links = useMemo(() => meta ? [...Array(meta.last_page)].map((_, index) => ({
        link: () => {
            const res = new URLSearchParams([...searchParams])
            res.set('page', (index + 1).toString())
            return `${page}?${res.toString()}`;
        },
        number: index + 1,
        isActive: index + 1 == meta.current_page
    })) : [], [meta, searchParams]);

    return (!meta ? null : <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
            <a href="#" className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</a>
            <a href="#" className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</a>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-end">
            <div className="mr-4">
                <p className="flex gap-1 text-sm text-gray-700 ">
                    <span>Showing</span>
                    <span className="font-medium">{meta.from}</span>
                    to
                    <span className="font-medium">{meta.to}</span>
                    of
                    <span className="font-medium">{meta.total}</span>
                    <span>results</span>
                </p>
            </div>
            <div>
                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                    <a href="#" className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                        <span className="sr-only">Previous</span>
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                        </svg>
                    </a>

                    {links?.map((link: any) =>
                        <NavLink key={link.number} to={link.link()} className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset   focus:z-20  ${link.isActive ? 'z-10 bg-indigo-600 text-white focus-visible:outline-indigo-600 focus-visible:outline-offset-2 focus-visible:outline-2 focus-visible:outline' : ' ring-gray-300 text-gray-900 hover:bg-gray-50 focus:outline-offset-0'}`}>{link.number}</NavLink>

                    )}
                    <a href="#" className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                        <span className="sr-only">Next</span>
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                        </svg>
                    </a>
                </nav>
            </div>
        </div>
    </div>
    )
}