import express from 'express';
          import validateRequest from '../../middlewares/validateRequest';
          import { ReviewController } from './review.controller';
          import { ReviewValidation } from './review.validation';
          const router = express.Router();
          
          router.get('/', ReviewController.getAllReview);
          router.get('/:id', ReviewController.getSingleReview);
          
          router.post(
            '/',
            validateRequest(ReviewValidation.createValidation),
            ReviewController.createReview
          );
          
          router.patch(
            '/:id',
            validateRequest(ReviewValidation.updateValidation),
            ReviewController.updateReview
          );
          router.delete('/:id', ReviewController.deleteReview);
          
          export const ReviewRoutes = router;