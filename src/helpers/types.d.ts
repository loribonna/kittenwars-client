export type Partial<T> = {
    [P in keyof T]?: T[P];
};

export type SubjectData = {
    value: string;
    name: string;
}

export type Required<T> = {
    [P in keyof T]: T[P];
};
