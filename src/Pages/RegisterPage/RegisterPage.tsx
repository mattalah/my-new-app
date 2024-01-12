import { NewspaperIcon } from "@heroicons/react/24/solid"
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { InputComponent } from "Components/InputComponent";

import { routes } from "Config/routes";

import { register } from "Service/AuthService";
import { useState } from "react";
import { Oval } from "react-loader-spinner";


export const RegisterPage = (): JSX.Element => {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name Required!"),
    email: Yup.string().email("Email is invalid!").required("Email Required!"),
    password: Yup.string()
      .min(8, "Password must be minimum 8 digits!")
      .required("Password Required!"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "Password must match!")
      .required("Confirm password is required!")
  });


  const onSubmit = async (values: MailSignIn) => {
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
        const {
          values,
          handleChange,
          handleSubmit,
          errors,
          isValidating
        } = formik;
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
            <div className={` ${isLoading ? 'hidden' : null} flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8`}>

              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <NewspaperIcon className="h-20 w-20 mx-auto sm:w-full sm:max-w-sm" />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Sign up your account
                </h2>
              </div>

              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <InputComponent id="name" label="Name"
                    name="name" autoComplete="name" value={values.name}
                    type="string" error={isValidating && errors.name} {...{ handleChange }} />
                  <InputComponent id="email" label="Email address"
                    name="email" autoComplete="email" value={values.email}
                    type="email" error={isValidating && errors.email} {...{ handleChange }} />
                  <InputComponent id="password" label="Password"
                    name="password" autoComplete="password" value={values.password}
                    type="password" error={isValidating && errors.password} {...{ handleChange }} />
                  <InputComponent id="confirmPassword" label="Confirm Password"
                    name="confirmPassword" autoComplete="confirmPassword" value={values.confirmPassword}
                    type="password" error={isValidating && errors.confirmPassword} {...{ handleChange }} />

                  <div className="flex items-center justify-between">
                    <button
                      type="submit"
                      className="mr-3 flex w-full justify-center rounded-md bg-purple-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                    >
                      Register
                    </button>
                  </div>
                </form>


              </div>
            </div >
          </>
        );
      }}
    </Formik >
  );
};