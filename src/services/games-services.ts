import { Games, InputGames } from '../protocols';
import { gamesRepository } from '../repositories/games-repositories';

async function createGames(homeTeamName: string, awayTeamName: string): Promise<Games> {
    const gamesData: InputGames = { homeTeamName, awayTeamName };
    const game = await gamesRepository.createGames(gamesData);
    return game;
}

export const gamesService = {
    createGames
};