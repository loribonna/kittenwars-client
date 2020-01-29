export interface IKitten {
    name?: String;
	age?: Number;
	insertDate?: Date;
    originalName: String
    savedName: String;
    size: Number;
    votes: Number;
}

export enum Pages {
	"kittens",
	"user",
    "score",
    "login"
}
