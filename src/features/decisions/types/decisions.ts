export interface Option {
    id: string;
    label: string;
}

export interface Decision {
    id: string;
    title: string;
    options: Option[];
    selectedOptionId: string | null;
    createdAt: number;
}