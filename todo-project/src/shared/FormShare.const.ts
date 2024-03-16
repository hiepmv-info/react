export interface FormShareBlockRow {
    title: string;
    property: string;
    type: string;
    validation?: string[];
    placeholder?: string;
}

export interface FormShareBlockColumn {
    row: FormShareBlockRow[]
    title: string;
    button?: string;
    redirect?: {
        title: string;
        link: string;
    };
}

export interface FormShareProps {
    column: FormShareBlockColumn;
    onSubmit: (data: any) => void;
}