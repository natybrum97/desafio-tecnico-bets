import { Router } from 'express';
import { betsController } from '../controllers/bets-controllers';
import { validateSchemaMiddleware } from '../middlewares/schema-handler-middleware';
import { betsSchema } from '../schemas/bets-schemas';

const betsRouter = Router();

betsRouter.post('/bets', validateSchemaMiddleware(betsSchema), betsController.betsPost);

export { betsRouter };
