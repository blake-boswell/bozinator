import logger from '@/lib/pino';
import { NextResponse } from 'next/server';
import { pino } from 'pino';

interface LogRequest {
  level: pino.Level;
  message: string;
}

export async function POST(req: Request) {
  const { level, message }: LogRequest = await req.json();
  switch (level) {
    case 'fatal':
      logger.fatal(message);
      break;
    case 'error':
      logger.error(message);
      break;
    case 'warn':
      logger.warn(message);
      break;
    case 'info':
      logger.info(message);
      break;
    case 'debug':
      logger.debug(message);
      break;
    case 'trace':
      logger.trace(message);
      break;
    default:
      logger.info(message);
      break;
  }

  return new NextResponse('OK', { status: 200 });
}
