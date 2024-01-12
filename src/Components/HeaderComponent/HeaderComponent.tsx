import { Bars3Icon } from "@heroicons/react/24/solid"

export const HeaderComponent = () => {
    return <header>
        <div className="grid grid-cols-3 p-10 items-center">
            <Bars3Icon className="h-8 w-8 cursor-pointer" />
            <h1 className="font-serif text-4xl text-center">Up to Date</h1>
            <div className="flex items-center justify-end space-x-2">
                {/* darkMode button */}
                {/* <button className="hidden md-inline bg-slate-900 text-white px-4 lg:px-8 py-2 lg:py-4 rounded-full dark:bg-slate-800">
                Subscribe
            </button> */}

            </div>
        </div>
    </header>
}