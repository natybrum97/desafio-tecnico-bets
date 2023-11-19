import { Router } from 'express';
import { gamesController } from '../controllers/games-controllers';
import { validateSchemaMiddleware } from '../middlewares/schema-handler-middleware';
import { gamesSchema, gameFinishSchema } from '../schemas/games-schemas';

const gamesRouter = Router();

gamesRouter.post('/games', validateSchemaMiddleware(gamesSchema), gamesController.gamesPost);
gamesRouter.get('/games', gamesController.gamesGet);
gamesRouter.get('/games/:id', gamesController.getGamesById);
gamesRouter.post('/games/:id/finish', validateSchemaMiddleware(gameFinishSchema), gamesController.gamefinishPost);

export { gamesRouter };
