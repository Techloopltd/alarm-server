import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ILoginResponse } from '../auth/auth.Interface';
import { UserService } from '../user/user.service';

const getProfile: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { userId } = req.user as JwtPayload;
    const result = await UserService.getSingleUser(userId);
    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'user not found');
    }
    const accessToken = jwtHelpers.createToken(
      { userId: result.id, role: result?.role },
      config.jwt.secret as Secret,
      config.jwt.expires_in as string,
    );
    const { password, ...rest } = result;
    sendResponse<ILoginResponse>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User fetched   successfully',
      data: {
        accessToken: accessToken,
        user: rest,
      },
    });
  },
);

export const ProfileController = {
  getProfile,
};
