
import Link from "next/link"
import LoginForm from "../components/forms/FormLogin"


export default async function LoginPage () {


    return (
      <div className="flex items-center justify-center bg-no-repeat min-h-screen bg-cover bg-[url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)]">
        <Link href={"/"} className="px-4 bg-white hover:bg-gray-200 py-1 text-xl border w-24 text-center font-medium rounded-md  absolute top-10 left-10 text-black">Inicio</Link>
        <article className="">
            <LoginForm/>
        </article>
        
      </div>
    )

}