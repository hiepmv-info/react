export interface ITodo {
    id: number
    title: string
    description: string
    done: boolean
    status: StatusEnum
    [key: string]: any
}

export enum StatusEnum {
    ACTIVE = 'Active',
    INACTIVE = 'Inactive',
    PENDING = 'Pending'
}

export interface ModalTodoProps {
    todo: ITodo | undefined;
    open: boolean;
    onClose: () => void;
    column: ModalBlockColumn;
    onSubmit: (todo: ITodo) => void;
}

export interface ModalBlockRow {
    title: string;
    property: string;
    type: string;
    validation?: string[];
}

export interface ModalBlockColumn {
    mode: string;
    row: ModalBlockRow[]
    title: string;
}

export const modalBlockColumnsEdit: ModalBlockColumn = {
    title: 'Edit Todo',
    mode: 'edit',
    row: [
        { title: 'Title', property: 'title', type: 'text', validation: ['required'] },
        { title: 'Description', property: 'description', type: 'textarea', validation: ['required', 'min:10'] },
        { title: 'Status', property: 'status', type: 'select' },
        { title: 'Done', property: 'done', type: 'checkbox' }
    ]
}

export const modalBlockColumnsView: ModalBlockColumn = {
    title: 'View Todo',
    mode: 'view',
    row: [
        { title: 'Title', property: 'title', type: 'text' },
        { title: 'Description', property: 'description', type: 'textarea' },
        { title: 'Status', property: 'status', type: 'text' },
        { title: 'Done', property: 'done', type: 'checkbox' }
    ]
}

export const modalBlockColumnsCreate: ModalBlockColumn = {
    title: 'Create Todo',
    mode: 'create',
    row: [
        { title: 'Title', property: 'title', type: 'text', validation: ['required'] },
        { title: 'Description', property: 'description', type: 'textarea', validation: ['required', 'min:10'] },
        { title: 'Status', property: 'status', type: 'select' },
        { title: 'Done', property: 'done', type: 'checkbox' }
    ]
}

export const statusColorMap = {
    [StatusEnum.ACTIVE]: 'text-green-600',
    [StatusEnum.INACTIVE]: 'text-red-600',
    [StatusEnum.PENDING]: 'text-yellow-600'
}