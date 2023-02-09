import type { NextApiRequest, NextApiResponse } from 'next';
import RegisterRepository from '@/core/domains/register/RegisterRepository';
import sendMail from '@/utils/sendgrid';
import crypto from 'crypto';
import { PostRegister } from '@/core/models/register/postRegister';
import { Register } from '@/core/models/register/register';

type Data = {
  data: Register | null;
};

type Error = {
  error: {
    message: string;
  };
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data | Error>) {
  switch (req.method) {
    case 'GET':
      break;

    case 'POST':
      break;

    case 'DELETE':
      break;

    default:
      res.status(405).end();
      break;
  }
}
