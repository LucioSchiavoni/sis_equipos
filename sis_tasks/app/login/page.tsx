
import Link from "next/link"
import LoginForm from "../components/forms/FormLogin"


export default async function LoginPage () {


    return (
      <div className="flex items-center justify-center ">
        <Link href={"/"} className="px-4 hover:bg-gray-200 py-1 text-xl border w-24 text-center font-medium rounded-md  absolute top-10 left-10 text-black">Inicio</Link>
        <article className="">
            <LoginForm/>
        </article>
        
      </div>
    )

}