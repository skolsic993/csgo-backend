import mongoose from 'mongoose';
import config from 'config';
import logger from './logger';

async function connect(): Promise<void> {
  const dbUri = process.env.DATABASE || config.get<string>('dbUri');

  try {
    await mongoose.connect(dbUri);
    logger.info('Successfully connected to the Database!');
  } catch (error) {
    logger.error('Could not connect to the Database!');
    process.exit(1);
  }
}

export default connect;
