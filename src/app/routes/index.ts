import { UserRoutes } from '../modules/user/user.router';

import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { fileUploadRoutes } from '../modules/fileUpload/fileUpload.route';
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
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
