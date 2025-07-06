import { EUserRole } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import { ProfileController } from './profile.controller';
const router = express.Router();
router.get(
  '/',
  auth(EUserRole.SUPER_ADMIN, EUserRole.ADMIN, EUserRole.USER),
  ProfileController.getProfile,
);

export const ProfileRoutes = router;
