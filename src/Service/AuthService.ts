import Api from "./utils";

type MailSignIn = {
    email: string;
    password: string;
}

async function mailSignIn({ email, password }: MailSignIn) {
    return await Api.post("oauth/sign-in", { email, password });
}

export {
    mailSignIn,
}