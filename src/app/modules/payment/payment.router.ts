import express from 'express';
          import validateRequest from '../../middlewares/validateRequest';
          import { PaymentController } from './payment.controller';
          import { PaymentValidation } from './payment.validation';
          const router = express.Router();
          
          router.get('/', PaymentController.getAllPayment);
          router.get('/:id', PaymentController.getSinglePayment);
          
          router.post(
            '/',
            validateRequest(PaymentValidation.createValidation),
            PaymentController.createPayment
          );
          
          router.patch(
            '/:id',
            validateRequest(PaymentValidation.updateValidation),
            PaymentController.updatePayment
          );
          router.delete('/:id', PaymentController.deletePayment);
          
          export const PaymentRoutes = router;