import { ErrorMessage } from "formik"

export const InputComponent = (data: any) => {
    const { handleChange, name, label, value, type, id, autoComplete, error } = data;
    return (
        <div>
            <label htmlFor={name} className="flex text-sm font-medium leading-6 text-gray-900">
                {label}
            </label>
            <div className="mt-2">
                <input
                    {...{ id, name, autoComplete, value, type }}
                    className={`pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6
                    ${error && "ring-red-500"}`}
                    onChange={handleChange}
                />
            </div>
            <ErrorMessage component="div" name={name} className="text-red-500" />
        </div>
    )
}