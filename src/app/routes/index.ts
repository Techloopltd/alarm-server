import { UserRoutes } from '../modules/user/user.router';

import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { FaqRoutes } from '../modules/faq/faq.router';
import { fileUploadRoutes } from '../modules/fileUpload/fileUpload.route';
import { ProfileRoutes } from '../modules/profile/profile.router';
import { ReviewRoutes } from '../modules/review/review.router';
const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/user',
    route: UserRoutes,
  },

  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/file-upload',
    route: fileUploadRoutes,
  },
  {
    path: '/faq',
    route: FaqRoutes,
  },
  {
    path: '/review',
    route: ReviewRoutes,
  },
  {
    path: '/profile',
    route: ProfileRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
