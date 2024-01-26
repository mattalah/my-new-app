import { useState } from "react";
import classNames from "classnames";
import { UserIcon, CogIcon } from "@heroicons/react/24/solid";
import { ProfileComponent } from "Components/ProfileComponent";
import { NewsParamComponent } from "Components/NewsParamComponent";

type DisplayKey = 'profile' | 'newsParam';

interface DisplayOption { key: DisplayKey, label: string, icon: JSX.Element };

export const ConfigPage = () => {

    const [display, setDisplay] = useState<DisplayKey>("profile");

    const displayOptions: DisplayOption[] = [
        { key: "profile", label: "Profile", icon: <UserIcon className="h-6 w-6 mr-2" /> },
        { key: "newsParam", label: "Config", icon: <CogIcon className="h-6 w-6 mr-2" /> }
    ];

    return (
        <div className="grid grid-rows-12">
            <div className="row-span-1 flex flex-wrap justify-center font-medium border-b border-purple-200 dark:border-purple-700 dark:text-purple-400">
                {displayOptions.map(option => (
                    <div
                        key={option.key}
                        className={classNames(
                            "flex items-center py-3 px-6 rounded-t-lg hover:bg-purple-100 dark:hover:bg-purple-800 cursor-pointer",
                            { "bg-purple-100 dark:bg-purple-800": display === option.key }
                        )}
                        onClick={() => setDisplay(option.key)}
                    >
                        {option.icon}
                        <span className={classNames("text-sm", { "text-purple-600 dark:text-purple-500": display === option.key })}>
                            {option.label}
                        </span>
                    </div>
                ))}
            </div>
            <div className="row-span-11">
                {display === "profile" ? <ProfileComponent /> : <NewsParamComponent />}
            </div>
        </div>
    );
};
