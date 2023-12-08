import React, {useContext} from "react";
import {templates} from "@reactivated";

import BaseLayout from "@client/layouts/BaseLayout";

export default (props: templates.LoginTemplate) => {
    return (
        <BaseLayout>
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
                            <form className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label htmlFor="email"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Twój email
                                    </label>
                                    <input type="email" name="email" id="email"
                                           className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           placeholder="jan.kowalski@student.wat.edu.pl" required={true} />
                                </div>
                                <div>
                                    <label htmlFor="password"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hasło</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••"
                                           className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           required={true} />
                                </div>
                                <div className="flex items-center justify-end">
                                    <a href="#"
                                       className="text-sm font-medium text-gray-500 hover:underline dark:text-primary-500">
                                        Odzyskaj hasło
                                    </a>
                                </div>
                                <button type="submit"
                                        className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                    Zaloguj się
                                </button>
                                <p className="text-sm font-light text-gray-600 dark:text-gray-400">
                                    Nie masz konta?
                                    {' '}
                                    <a href="#" className="font-medium text-gray-600 hover:underline dark:text-primary-500">
                                        Zarejestruj się
                                    </a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </BaseLayout>
)
}