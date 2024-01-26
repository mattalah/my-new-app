import { useState } from "react";

import { Oval } from "react-loader-spinner";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { InputComponent } from "Components/InputComponent";

import { routes } from "Config/routes";

import { register } from "Service/AuthService";
export const NewsParamComponent = () => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name Required!"),
        email: Yup.string().email("Email is invalid!").required("Email Required!"),
        password: Yup.string()
            .min(8, "Password must be minimum 8 digits!"),
    });


    const onSubmit = async (values: Register) => {
        setIsLoading(true)
        try {
            await register({
                name: values.name,
                email: values.email,
                password: values.password,
            })
            setIsLoading(false);
            navigate(routes.signIn);
        } catch (e: any) {
            setIsLoading(false)
            if (e.message == "already_registered") {
                setTimeout(() => navigate(routes.signIn), 5000);
            }
        }

    };

    const initialValues = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    }
    return (
        <Formik
            {...{ initialValues, validationSchema, onSubmit }}
        >
            {(formik) => {
                // const {
                //     values,
                //     handleChange,
                //     handleSubmit,
                //     errors,
                //     isValidating
                // } = formik;
                return (
                    <>
                        <Oval
                            visible={isLoading}
                            wrapperClass="-z-1 flex justify-center items-center"
                            height="80"
                            width="80"
                            color="#805ad5"
                            secondaryColor="#D8D7D7"
                            ariaLabel="oval-loading"
                            wrapperStyle={{}}

                        />
                        <div className={`${isLoading ? 'hidden' : 'flex'} min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8`}>

                            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                    Update your account
                                </h2>
                            </div>

                            {/* <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                                <form className="space-y-6" onSubmit={handleSubmit}>
                                    <div key={section.id} className=" border-gray-200 px-4 py-6">
                                        <div >
                                            <h3 className="-mx-2 -my-3 flow-root">
                                                <button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                                    <span className="font-medium text-gray-900">{section.name}</span>
                                                </button>
                                            </h3>
                                            <div className="pt-6">
                                                <div className="space-y-6">
                                                    {section.type == "checkbox" && section?.options?.map((option, optionIdx) => (
                                                        <div key={option.value} className="flex items-center">
                                                            <input
                                                                id={`filter-mobile-${section.id}-${optionIdx}`}
                                                                name={`${section.id}[]`}
                                                                defaultValue={option.value}
                                                                onChange={(e) => handleValueChange(e.target.value, section.id, "checkbox", option.label)}
                                                                type={section.type}
                                                                defaultChecked={option.checked}
                                                                className="h-4 w-4 rounded border-gray-300 accent-purple-600 focus:ring-purple-500"
                                                            />
                                                            <label
                                                                htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                                className="ml-3 min-w-0 flex-1 text-gray-500"
                                                            >
                                                                {option.label}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="mr-3 flex w-full justify-center rounded-md bg-purple-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                                    >
                                        Update
                                    </button>
                                </form>

                            </div> */}


                        </div >
                    </>
                );
            }}
        </Formik >
    );
}