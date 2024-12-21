import { S3Client } from '@aws-sdk/client-s3';
import { SQSClient } from '@aws-sdk/client-sqs';
import dotenv from 'dotenv';
import path from 'path';

const env = process.env.NODE_ENV || 'development';

// Load the corresponding .env file
dotenv.config({
  path: path.resolve(process.cwd(), `.env.${env}`),
});

const s3Client = new S3Client({
  endpoint: process.env.AWS_ENDPOINT || 'http://aws:4566', // LocalStack endpoint
  region: process.env.AWS_REGION || 'us-east-1', // Default region
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY || 'test', // Default LocalStack credentials
    secretAccessKey: process.env.AWS_SECRET_KEY || 'test',
  },
  forcePathStyle: true, // Necessary for LocalStack compatibility
});

const sqsClient = new SQSClient({
  endpoint: process.env.AWS_ENDPOINT || 'http://aws:4566', // LocalStack endpoint
  region: process.env.AWS_REGION || 'us-east-1', // Default region
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY || 'test', // Default LocalStack credentials
    secretAccessKey: process.env.AWS_SECRET_KEY || 'test',
  },
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
