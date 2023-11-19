import { Router } from 'express';
import { participantsController } from '../controllers/participants-controllers';
import { validateSchemaMiddleware } from '../middlewares/schema-handler-middleware';
import { participantsSchema } from '../schemas/participants-schemas';

const participantsRouter = Router();

participantsRouter.post(
  '/participants',
  validateSchemaMiddleware(participantsSchema),
  participantsController.participantsPost,
);
participantsRouter.get('/participants', participantsController.participantsGet);

export { participantsRouter };
