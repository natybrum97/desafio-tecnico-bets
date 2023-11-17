// import { Request, Response } from 'express';
// import httpStatus from 'http-status';
// import { InputBets } from '../protocols';

// export async function betsPost(req: Request, res: Response) {
//     const { homeTeamScore, awayTeamScore, amountBet, gameId, participantId } = req.body as InputBets;

//     const result = await authenticationService.signIn({ homeTeamScore, awayTeamScore, amountBet, gameId, participantId });

//     return res.status(httpStatus.CREATED).send(result);
// }

// export const betsController = {
//     betsPost
// };