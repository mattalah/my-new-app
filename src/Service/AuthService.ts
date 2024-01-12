import Api, { setToken } from "./utils";
import { toast } from "react-toastify";


const register = async ({ email, password, name }: Register) => {
    try {
        const response = await Api.post("auth/register", { email, password, name });
        toast.info("Successfully registered !", {
            position: toast.POSITION.TOP_RIGHT
        });
        return response.data;
    } catch (e: any) {
        if (e.response.status == 422) {
            toast.error("Already registered !", {
                position: toast.POSITION.TOP_RIGHT
            });
            throw new Error("already_registered");

        } else {
            toast.error("Server Error !", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }

};

const login = async (data: Login) => {
    try {
        const response = await Api.post("auth/login", data);
        toast.info("You are connected !", {
            position: toast.POSITION.TOP_RIGHT
        });
        setToken(response.data.result.token.access_token);
    } catch (e: any) {
        if (e.response.status == 401) {
            toast.error("Check your credentials !", {
                position: toast.POSITION.TOP_RIGHT
            });
            throw new Error("already_registered");

        } else {
            toast.error("Server Error !", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }

};

export {
    register,
    login
}