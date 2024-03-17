import { FormShareBlockColumn, FormShareBlockRow, FormShareProps } from "./FormShare.const";
import { validateSchema } from "./ValidateSchema";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { memo, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";

const getDefaultValues = (column: FormShareBlockColumn) => column.row.reduce((prev, curr) => ({ ...prev, [curr.property]: '' }), {});

const FormShare = memo(({ column, onSubmit }: FormShareProps) => {
    console.log('FormShare');
    const schema = useMemo(() => validateSchema(column), [column]);
    const defaultValues = useMemo(() => getDefaultValues(column), [column]);
    const { control, handleSubmit, formState: { errors } } = useForm<any>({
        mode: "onChange",
        resolver: yupResolver(schema),
        defaultValues,
    });    

    const onSubmitCallback = useCallback((data: any) => onSubmit(data), [onSubmit]);

    return (
        <div className="dark:bg-gray-800 min-h-screen flex items-center justify-center">
            <div className="w-3/6 py-6 px-8 mt-20 bg-white dark:bg-gray-900 rounded shadow-xl">
                <form onSubmit={handleSubmit(onSubmitCallback)}>
                    {column.row.map((item: FormShareBlockRow, index: number) => (
                        <div key={index} className="mb-6">
                            <label htmlFor={item.property} className="block text-gray-800 dark:text-gray-200 font-bold">{item.title}</label>
                            <Controller
                                name={item.property}
                                control={control}
                                render={({ field }) => item.type !== 'checkbox' || item.title !== 'select' ? (
                                    <input type={item.type}
                                        {...field}
                                        placeholder={item.placeholder} className={`${errors[item.property] ? "border-error" : ""} w-full border border-gray-300 dark:border-gray-700 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600 dark:bg-gray-800 dark:text-gray-200`} />
                                ) : <></>}
                            />
                            {errors[item.property] && (
                                <span className="text-red-500 text-xs">
                                    {errors[item.property]?.message?.toString()}
                                </span>
                            )}
                        </div>
                    ))}
                    {column.redirect && (<Link to={column.redirect.link} className="text-sm font-thin text-gray-800 dark:text-gray-200 hover:underline mt-2 inline-block hover:text-indigo-600 dark:hover:text-indigo-300">{column.redirect.title}</Link>)}
                    {column.button && (<button className="cursor-pointer py-2 px-4 block mt-6 bg-indigo-500 text-white font-bold w-full text-center rounded">{column.button}</button>)}
                </form>
            </div>
        </div>
    )
})

export default FormShare;