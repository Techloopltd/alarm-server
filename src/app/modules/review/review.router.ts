import { EUserRole } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewController } from './review.controller';
import { ReviewValidation } from './review.validation';
const router = express.Router();

router.get('/', ReviewController.getAllReview);
router.get('/:id', ReviewController.getSingleReview);

router.post(
  '/',
  auth(EUserRole.ADMIN, EUserRole.SUPER_ADMIN, EUserRole.USER),
  validateRequest(ReviewValidation.createValidation),
  ReviewController.createReview,
);

router.patch(
  '/:id',
  auth(EUserRole.ADMIN, EUserRole.SUPER_ADMIN, EUserRole.USER),
  validateRequest(ReviewValidation.updateValidation),
  ReviewController.updateReview,
);
router.delete(
  '/:id',
  auth(EUserRole.ADMIN, EUserRole.SUPER_ADMIN, EUserRole.USER),
  ReviewController.deleteReview,
);

export const ReviewRoutes = router;
