import { useFormik } from "formik"
import * as yup from 'yup'
import { signIn, useSession } from "next-auth/react"
import { authentication } from "@/settings/firebase.setting"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "next/router"

const validationRules = yup.object().shape({
    email:yup.string().required('this field is compulsory'),
    password:yup.string()
    .required()
    .min(8,'must be up to 8 characters')
    .max(36,'cannot be more than 36 charactters')
    .oneOf([yup.ref('passwordConfirmation'),null],'your password must match')
})

export default function Signup() {
    const {data:session} = useSession();
    const router = useRouter()

    if(session) {
        router.push("/feeds")
    }

    const handleGoogleEmailPasswordCreateAccount = async (userEmail,userPassword) => {
        createUserWithEmailAndPassword(authentication,userEmail,userPassword)
        .then((user) => {
            console.log(user);
        })
        .catch((error) => console.error(error))
    }

    const {handleBlur,handleSubmit,handleChange,errors,touched,values} = useFormik({
        initialValues:{email:'',password:'',passwordConfirmation:''},
        onSubmit: values => {
            handleGoogleEmailPasswordCreateAccount(values.email,values.password);
        },
        validationSchema:validationRules
    });

    return (
        <>
        <main className="h-screen flex justify-center items-center">
            <div className="w-[480px] sm:min-h-[480px] flex flex-col gap-5">
                <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                    <input 
                    id="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Email address"
                    className="py-3 sm:py-5 px-2 border border-indigo-400 rounded-lg bg-white/60"
                    />
                    {errors.email && touched.email ? (<span className=" text-red-500">{errors.email}</span>) : null}

                    <input 
                    id="password"
                    type="password" 
                    value={values.pasword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Password"
                    className="py-3 sm:py-5 px-2 border border-indigo-400 rounded-lg bg-white/60"
                    />
                    {errors.password && touched.password ? <span className=" text-red-500">{errors.password}</span> : null}

                    <input 
                    id="passwordConfirmation"
                    type="password" 
                    value={values.passwordConfirmation}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Confirm Password"
                    className="py-3 sm:py-5 px-2 border border-indigo-400 rounded-lg bg-white/60"
                    />
                    <button type="submit" className="max-w-[160px] h-12 bg-indigo-800 rounded-lg text-white font-bold"
                    >Create Account</button>
                </form>
        
                <div className="w-full grid grid-cols-3 gap-3">
                    <button className="w-full h-12 bg-green-600 rounded-lg text-white font-bold"
                    onClick={() => signIn("google")}>Google</button>
                    <button className="w-full h-12 bg-gray-800 rounded-lg text-white font-bold"
                    onClick={() => signIn("github")}>Github</button>
                    <button className="w-full h-12 bg-sky-600 rounded-lg text-white font-bold">Twitter</button>
                </div>
            </div>
        </main>
        </>
    )
}