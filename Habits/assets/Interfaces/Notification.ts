export interface INotification {
    title:string,
    body:string,
    data:unknown,
    code:INoteCode
}

export type INoteCode = "None"|"Pomodoro"