export interface INote
{
    header:string,
    text:string,
    owners:string[],
    private:boolean,
    lastUpdated:number,
    id:string
}