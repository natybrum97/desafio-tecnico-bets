export type ApplicationError = {
	name: string;
	message: string;
};

export type RequestError = {
	status: number;
	data: object | null;
	statusText: string;
	name: string;
	message: string;
};

export type InputParticipants = {
	name: string;
	balance: number;
};

export type InputBets = {
	homeTeamScore: number;
	awayTeamScore: number;
	amountBet: number;
	gameId: number;
	participantId: number;
};

export type InputGames = {
	homeTeamName: string;
	awayTeamName: string;
};

export type Participants = {
	id: number;
	createdAt: Date;
	updatedAt: Date;
	name: string;
	balance: number;
};

export type Games = {
	id: number;
	createdAt: Date;
	updatedAt: Date;
	homeTeamName: string;
	awayTeamName: string;
	homeTeamScore: number; 
	awayTeamScore: number; 
	isFinished: boolean;
}