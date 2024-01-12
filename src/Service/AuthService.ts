import Api from "./utils";
import { toast } from "react-toastify";


const register = async ({ email, password, name }: MailSignIn) => {
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

export {
    register,
}