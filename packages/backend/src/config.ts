import dotenv from 'dotenv';
import path from 'path';

const env = process.env.NODE_ENV || 'development';

// Load the corresponding .env file
dotenv.config({
  path: path.resolve(process.cwd(), `.env.${env}`),
});

// Export environment variables
const config = {
  nodeEnv: env,
  port: parseInt(process.env.PORT || '8000', 10),
  s3_bucket_name: process.env.S3_BUCKET_NAME || 'dev-bucket',
  s3_endpoint: process.env.S3_ENDPOINT || 'http://aws:4566',
  sqs_queue_name: process.env.SQS_QUEUE_NAME || 'dev-queue',
  sqs_queue_url: process.env.SQS_QUEUE_URL || 'http://aws:4566/000000000000/dev-queue',
  env: process.env.NODE_ENV || 'development',
};

export default config;
