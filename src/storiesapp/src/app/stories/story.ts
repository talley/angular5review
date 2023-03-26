export class Story
{
    id:number;
    plot:string;
    writer:string;
    upvotes:number;
    editing:boolean;
    constructor(id: number, plot: string, writer: string, upvotes:number,editing:boolean)
    {
        this.id=id;
        this.plot=plot;
        this.writer=writer;
        this.upvotes=upvotes;
        this.editing=editing;

    }
}