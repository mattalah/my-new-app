import { useState } from "react";

import { Oval } from "react-loader-spinner";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { InputComponent } from "Components/InputComponent";
import { routes } from "Config/routes";

import { register } from "Service/AuthService";

export const ProfileComponent = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name Required!"),
        email: Yup.string().email("Email is invalid!").required("Email Required!"),
        password: Yup.string().min(8, "Password must be minimum 8 digits!"),
    });

    const initialValues = {
        name: '',
        email: '',
        password: '',
    };

    const onSubmit = async (values: Register) => {
        setIsLoading(true);
        try {
            await register({
                name: values.name,
                email: values.email,
                password: values.password,
            });
            setIsLoading(false);
            navigate(routes.signIn);
        } catch (e: any) {
            setIsLoading(false);
            if (e.message === "already_registered") {
                setTimeout(() => navigate(routes.signIn), 5000);
            }
        }
    };

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
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ handleSubmit }) => (
                    <div className={`${isLoading ? 'hidden' : 'flex'} min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8`}>
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                Update your profile data
                            </h2>
                        </div>
                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <Form className="space-y-6" onSubmit={handleSubmit}>
                                <InputComponent
                                    id="name"
                                    label="Name"
                                    name="name"
                                    autoComplete="name"
                                    type="string"
                                />
                                <InputComponent
                                    id="email"
                                    label="Email address"
                                    name="email"
                                    autoComplete="email"
                                    type="email"
                                />
                                <InputComponent
                                    id="password"
                                    label="New Password"
                                    name="password"
                                    autoComplete="password"
                                    type="password"
                                />
                                <div className="flex items-center justify-between">
                                    <button
                                        type="submit"
                                        className="mr-3 flex w-full justify-center rounded-md bg-purple-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                                    >
                                        Update
                                    </button>
                                </div>
                            </Form>
                        </div>
                    </div>
                )}
            </Formik>
        </>
    );
};