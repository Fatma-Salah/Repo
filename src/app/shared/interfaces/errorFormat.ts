export interface errorFormat{
    message:string,
    field:string
}
export interface ServerErrorFormat {
  [field: string]: string[];
}