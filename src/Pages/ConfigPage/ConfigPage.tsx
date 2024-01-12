import { ProfileComponent } from "Components/ProfileComponent"
import { NewsParamComponent } from "Components/NewsParamComponent"
import { useState } from "react"


export const ConfigPage = () => {

    const [display, setDisplay] = useState<'profile' | 'newsParam'>("profile")
    return (
        <div className="grid grid-rows-12">
            <div className="row-span-1 flex flex-wrap text-sm  justify-center font-medium text-center border-b border-purple-200 dark:border-purple-700 dark:text-purple-400">
                <div className={`inline-block py-5 px-20 rounded-t-lg hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-800 dark:hover:text-purple-300 ${display === "profile" ? " text-purple-600 bg-purple-100 dark:bg-purple-800 dark:text-purple-500" : "text-purple-500"}`} onClick={() => setDisplay("profile")}>
                    Profile
                </div>
                <div className={`inline-block py-5 px-20 rounded-t-lg hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-800 dark:hover:text-purple-300 ${display === "newsParam" ? " text-purple-600 bg-purple-100 dark:bg-purple-800 dark:text-purple-500" : "text-purple-500"}`} onClick={() => setDisplay("newsParam")}>
                    Config
                </div>
            </div>
            <div className="row-span-11">
                {display === "profile" ? <ProfileComponent /> : <NewsParamComponent />}
            </div>
        </div>
    )
}