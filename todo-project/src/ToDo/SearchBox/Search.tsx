import { useState, useCallback } from "react";
import { ITodo, StatusEnum } from "../Todo.const";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';

function Search({
    setSearch,
    setOpenModal,
    setSelectedTodo,
    setModalMode
}: {
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedTodo: React.Dispatch<React.SetStateAction<ITodo>>;
    setModalMode: React.Dispatch<React.SetStateAction<string>>;
}) {
    console.log('Search');
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }, []);

    const handleSearch = useCallback(() => {
        setSearch(inputValue);
    }, [inputValue, setSearch]);

    const handleAdd = useCallback(() => {
        setSelectedTodo({
            id: 0,
            title: "",
            description: "",
            status: StatusEnum.ACTIVE,
            done: false
        });
        setModalMode("create");
        setOpenModal(true);
    }, [setSelectedTodo, setModalMode, setOpenModal]);

    const handleLogout = useCallback(() => {
        Cookies.remove('token');
    }, []);

    return (
        <>
            <div className="relative w-full max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-full">
                <input
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Search Todo"
                    className="rounded-full w-full h-16 bg-transparent py-2 pl-8 pr-32 outline-none border-2 border-gray-100 dark:border-gray-700 shadow-md hover:outline-none focus:ring-teal-200 dark:focus:ring-teal-200 focus:border-teal-200 dark:focus:border-teal-200 dark:text-gray-300"
                    type="text"
                    name="query"
                    id="query"
                />
                <button
                    onClick={handleAdd}
                    type="submit"
                    className="absolute inline-flex items-center h-10 px-4 py-2 text-sm text-white transition duration-150 ease-in-out rounded-full outline-none right-1/4 top-3 bg-blue-600 sm:px-6 sm:text-base sm:font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 add-button"
                >
                    <svg
                        className="me-1 -ms-1 w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                    Add
                </button>
                <button
                    onClick={handleSearch}
                    type="submit"
                    className="absolute inline-flex items-center h-10 px-4 py-2 text-sm text-white transition duration-150 ease-in-out rounded-full outline-none right-3 top-3 bg-teal-600 sm:px-6 sm:text-base sm:font-medium hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                    <svg
                        className="-ml-0.5 sm:-ml-1 mr-2 w-4 h-4 sm:h-5 sm:w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        ></path>
                    </svg>
                    Search
                </button>

            </div>
            <Link
            onClick={handleLogout}
                to="/login"
                style={{ left: "94%" }}
                className="absolute inline-flex items-center h-10 px-4 py-2 text-sm text-white transition mr-7 duration-150 ease-in-out rounded-full outline-none top-3 bg-teal-600 sm:px-6 sm:text-base sm:font-medium hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
                Log out
            </Link>
        </>
    );
}

export default Search;