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

export type InputBetsPost = {
  homeTeamScore: number;
  awayTeamScore: number;
  amountBet: number;
  gameId: number;
  participantId: number;
  status: string;
};

export type InputGames = {
  homeTeamName: string;
  awayTeamName: string;
};

export type InputResultGame = {
  homeTeamScore: number;
  awayTeamScore: number;
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
};

export type Bets = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  homeTeamScore: number;
  awayTeamScore: number;
  amountBet: number;
  gameId: number;
  participantId: number;
  status: string;
  amountWon: number | null;
};
