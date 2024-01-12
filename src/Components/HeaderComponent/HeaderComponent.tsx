import { Cog8ToothIcon } from "@heroicons/react/24/solid"
import { routes } from "Config/routes"
import { Link } from "react-router-dom"

export const HeaderComponent = () => {
    return <header>
        <div className="grid grid-cols-12 p-10">
            <div className="font-serif text-4xl text-center col-span-11">
                <Link to={routes.articles} ><h1 >My News App</h1></Link>
            </div>

            <div className="flex cursor-pointer col-span-1 justify-end">
                <Link to={routes.configs} >
                    <Cog8ToothIcon className="h-8 w-8" />
                </Link></div>


        </div>

    </header >
}