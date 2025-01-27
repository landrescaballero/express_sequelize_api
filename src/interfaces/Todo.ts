export interface ICreateTodo {
    title: string;
    description?: string;
    user_id: string;
}

export interface IUpdateTodo {
    title?: string;
    description?: string;
}