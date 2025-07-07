import express from 'express';
          import validateRequest from '../../middlewares/validateRequest';
          import { SubscriptionController } from './subscription.controller';
          import { SubscriptionValidation } from './subscription.validation';
          const router = express.Router();
          
          router.get('/', SubscriptionController.getAllSubscription);
          router.get('/:id', SubscriptionController.getSingleSubscription);
          
          router.post(
            '/',
            validateRequest(SubscriptionValidation.createValidation),
            SubscriptionController.createSubscription
          );
          
          router.patch(
            '/:id',
            validateRequest(SubscriptionValidation.updateValidation),
            SubscriptionController.updateSubscription
          );
          router.delete('/:id', SubscriptionController.deleteSubscription);
          
          export const SubscriptionRoutes = router;