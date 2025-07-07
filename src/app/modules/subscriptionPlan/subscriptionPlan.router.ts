import { EUserRole } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { SubscriptionPlanController } from './subscriptionPlan.controller';
import { SubscriptionPlanValidation } from './subscriptionPlan.validation';
const router = express.Router();

router.get('/', SubscriptionPlanController.getAllSubscriptionPlan);
router.get('/:id', SubscriptionPlanController.getSingleSubscriptionPlan);

router.post(
  '/',
  auth(EUserRole.ADMIN, EUserRole.SUPER_ADMIN),
  validateRequest(SubscriptionPlanValidation.createValidation),
  SubscriptionPlanController.createSubscriptionPlan,
);

router.patch(
  '/:id',
  auth(EUserRole.ADMIN, EUserRole.SUPER_ADMIN),
  validateRequest(SubscriptionPlanValidation.updateValidation),
  SubscriptionPlanController.updateSubscriptionPlan,
);
router.delete(
  '/:id',
  auth(EUserRole.ADMIN, EUserRole.SUPER_ADMIN),
  SubscriptionPlanController.deleteSubscriptionPlan,
);

export const SubscriptionPlanRoutes = router;
