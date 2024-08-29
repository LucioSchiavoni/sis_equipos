import Link from 'next/link'
import FormRegister from '../components/forms/FormRegister'
import Image from 'next/image'

export default async function RegisterPage() {
  return (
    <div className="bg-white dark:bg-gray-900">
    <div className="flex justify-center h-screen">
    <Link href={"/"} className="px-4 hover:bg-cyan-600 bg-cyan-700    py-1 text-xl  w-24 text-center font-medium rounded-md  absolute top-10 left-10 text-white">Inicio</Link>
        <div className="hidden bg-cover lg:block lg:w-2/3 bg-[url(https://www.notebookcheck.nl/fileadmin/Notebooks/News/_nc3/photo_1531297484001_80022131f5a1.jpg)]" >
            <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
                <div>
                    <h2 className="text-2xl font-bold text-white sm:text-3xl">Registro de equipos</h2>

                    <p className="max-w-xl mt-3 text-2xl font-semibold text-gray-300">
                      Crea una cuenta para empezar a registrar equipos
                    </p>
                </div>
            </div>
        </div>

        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
            <div className="flex-1">
                <div className="text-center">
                    <div className="flex justify-center mx-auto">
                        <Image className="w-auto " width={600} height={600} src="/mec-logo.jpg" alt="logo"/>
                    </div>

                    <p className="mt-3 text-gray-500 text-2xl font-semibold  dark:text-gray-300">Registrate</p>
                </div>

                <div className="mt-8 flex  justify-center items-center">
                <FormRegister/>

                 
                </div>
            </div>
        </div>
    </div>
</div>
  )
}




