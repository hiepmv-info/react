export interface FormShareBlockRow {
    title: string;
    property: string;
    type: string;
    validation?: string[];
}

export interface FormShareModalBlockColumn {
    row: FormShareBlockRow[]
    title: string;
}
