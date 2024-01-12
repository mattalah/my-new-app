import { NewspaperIcon } from "@heroicons/react/24/solid"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { ErrorMessage, Formik } from "formik";


import { InputComponent } from "Components/InputComponent"
import { routes } from "Config/routes";
import { login } from "Service/AuthService";
import { Oval } from "react-loader-spinner";


export const SignInPage = (): JSX.Element => {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email is invalid!").required("Email Required!"),
    password: Yup.string()
      .min(8, "Password must be minimum 8 digits!")
      .required("Password Required!"),
  });


  const onSubmit = async (values: Login) => {
    setIsLoading(true)
    try {
      await login({
        email: values.email,
        password: values.password,
      })
      setIsLoading(false);
      navigate(routes.articles);
    } catch (e: any) {
      setIsLoading(false)
    }

  };

  const initialValues = {
    email: '',
    password: '',
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
            <div className={`${isLoading ? 'hidden' : 'flex'} min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8`}>
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <NewspaperIcon className="h-20 w-20 mx-auto sm:w-full sm:max-w-sm" />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Sign in to your account
                </h2>
              </div>

              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <InputComponent id="email" label="Email address"
                    name="email" autoComplete="email" value={values.email}
                    type="email" error={isValidating && errors.email} {...{ handleChange }} />

                  <div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                        Password
                      </label>
                      <div className="text-sm">
                        <a href="#" className="font-semibold text-purple-600 hover:text-purple-500">
                          Forgot password?
                        </a>
                      </div>
                    </div>
                    <div className="mt-2">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        value={values.password}
                        onChange={handleChange}
                        className={`pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 ${isValidating && errors.password && "ring-red-500"}`}
                      />
                    </div>
                    <ErrorMessage component="div" name="password" className="text-red-500" />

                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      type="submit"
                      className="mr-3 flex w-full justify-center rounded-md bg-purple-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                    >
                      Sign in
                    </button>
                    <button
                      className="ml-3 flex w-full justify-center rounded-md bg-purple-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                      onClick={() => navigate(routes.register)}
                    >
                      Register
                    </button>
                  </div>
                </form>


              </div>
            </div>
          </>
        )
      }}
    </Formik >
  );
};