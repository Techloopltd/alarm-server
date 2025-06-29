import { EUserRole } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { FaqController } from './faq.controller';
import { FaqValidation } from './faq.validation';
const router = express.Router();

router.get('/', FaqController.getAllFaq);
router.get('/:id', FaqController.getSingleFaq);

router.post(
  '/',
  auth(EUserRole.ADMIN, EUserRole.SUPER_ADMIN),
  validateRequest(FaqValidation.createValidation),
  FaqController.createFaq,
);

router.patch(
  '/:id',
  auth(EUserRole.ADMIN, EUserRole.SUPER_ADMIN),
  validateRequest(FaqValidation.updateValidation),
  FaqController.updateFaq,
);
router.delete(
  '/:id',
  auth(EUserRole.ADMIN, EUserRole.SUPER_ADMIN),
  FaqController.deleteFaq,
);

export const FaqRoutes = router;
