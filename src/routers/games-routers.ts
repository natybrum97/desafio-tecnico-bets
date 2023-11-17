import { Router } from 'express';
import { gamesController } from '../controllers/games-controllers';
import { validateSchemaMiddleware } from '../middlewares/schema-handler-middleware';
import { gamesSchema } from '../schemas/games-schemas';

const gamesRouter = Router();

gamesRouter.post('/games', validateSchemaMiddleware(gamesSchema), gamesController.gamesPost);
gamesRouter.get('/games', gamesController.gamesGet);

export { gamesRouter };