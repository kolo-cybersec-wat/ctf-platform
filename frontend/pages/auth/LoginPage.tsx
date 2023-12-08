import React, {useContext, useEffect} from "react";
import {postData} from "../../fetchUtils";
import {useLocation, useNavigate} from "react-router-dom";

const LoginPage = () => {
    const [res, setRes] = React.useState(null)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if(res && res.success) {
            const query = new URLSearchParams(location.search)
            const next = query.get('next')
            navigate(next ? next : '/')
        }
    }, [res]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        e.stopPropagation()

        const formData = new FormData(e.currentTarget)
        const loginData = {
            username: formData.get('username'),
            password: formData.get('password')
        }

        setRes(null)
        postData('/api/auth/login/', {
            body: JSON.stringify(loginData)
        }).then(res => res.json()).then(setRes)
    }
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="mb-6 text-gray-900 dark:text-white">
                    <span className="text-2xl block text-center font-semibold">Capture the Flag</span>
                    <span className="mt-2 text-xl block text-center">Koło CyberSecurity WCY WAT</span>
                </a>
                <div
                    className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Zaloguj się
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div className="">
                                {res && res.non_field_errors && res.non_field_errors.map((err: string) => (
                                    <div
                                        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                        {err}
                                    </div>
                                ))
                                }
                            </div>
                            <div>
                                <label htmlFor="username"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Twoja nazwa użytkownika
                                </label>
                                <input type="username" name="username" id="username"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       placeholder="jan.kowalski@student.wat.edu.pl" required={true}/>
                            </div>
                            <div>
                                <label htmlFor="password"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hasło</label>
                                <input type="password" name="password" id="password" placeholder="••••••••"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       required={true}/>
                            </div>
                            <button type="submit"
                                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                Zaloguj się
                            </button>
                            <p className="text-sm font-light text-gray-600 dark:text-gray-400">
                                <span className="font-medium">Masz problem z logowaniem?</span><br/>
                                Skontaktuj się z organizatorami (zarzad@kolocybersecurity.pl)
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LoginPage