import { ModalBlockRow, ModalTodoProps, StatusEnum } from "../Todo.const";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { validateSchema } from "../../shared/ValidateSchema";
import React, { useMemo } from "react";

const ModalTodo = React.memo(({ todo, onClose, column, onSubmit }: ModalTodoProps) => {
    console.log('ModalTodo');
    const isEditMode = column.mode === "edit" || column.mode === "create";

    const schema = useMemo(() => validateSchema(column), [column]);
    const { control, handleSubmit, formState: { errors }, } = useForm<any>({
        mode: "onChange",
        resolver: yupResolver(schema),
        defaultValues: todo,
    });
    const renderInput = React.useCallback((item: ModalBlockRow) => {
        if (['text', 'textarea', 'select', 'checkbox'].indexOf(item.type) === -1) {
            return <></>;
        }
        return (
            <Controller
                name={item.property}
                control={control}
                render={({ field }) => item.type === "text" ? (
                    <input
                        {...field}
                        type="text"
                        className={`${errors[item.property] ? "border-error" : ""
                            } block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                        placeholder="Type todo title"
                    />
                ) : item.type === "textarea" ? (
                    <textarea
                        {...field}
                        rows={4}
                        className={`${errors[item.property] ? "border-error" : ""
                            } block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                        placeholder="Write todo description here"
                    ></textarea>
                ) : item.type === "select" ? (
                    <select
                        {...field}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    >
                        {Object.values(StatusEnum).map((status, id) => (
                            <option key={id} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>
                ) : (
                    <Controller
                        name={item.property}
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="checkbox"
                                checked={field.value}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                        )}
                    />
                )}
            />
        );
    },
        [control, errors]
    );
    
    const onSubmitCallback = React.useCallback((data: any) => onSubmit(data), [onSubmit]);

    return (
        <div
            className={`bg-black bg-opacity-70 fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
        >
            <div className="relative p-4 w-full max-w-md max-h-full mx-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {column.title}
                        </h3>
                        <button
                            onClick={onClose}
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-toggle="crud-modal"
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    {isEditMode ? (
                        <>
                            <form className="p-4 md:p-5" onSubmit={handleSubmit(onSubmitCallback)}>
                                <div className="grid gap-4 mb-4 grid-cols-2">
                                    {column.row.map((item, id) => (
                                        <div key={id} className="col-span-2">
                                            <label
                                                htmlFor={item.property}
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                {item.title}
                                            </label>
                                            <div>{renderInput(item)}</div>
                                            {errors[item.property] && (
                                                <span className="text-red-500 text-xs">
                                                    {errors[item.property]?.message?.toString()}
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <button
                                    type="submit"
                                    className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    <svg
                                        className="feather feather-edit"
                                        fill="none"
                                        height="24"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        width="24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                    </svg>
                                    &nbsp;{column.title}
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className="p-4 md:p-5">
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                {column.row.map((item, id) => (
                                    <div key={id} className="col-span-2">
                                        <label
                                            htmlFor={item.property}
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            {item.title}
                                        </label>
                                        <span className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                            {item.type === "checkbox"
                                                ? todo?.[item.property]
                                                    ? "Done"
                                                    : "No done"
                                                : todo?.[item.property]}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
);

export default ModalTodo;
