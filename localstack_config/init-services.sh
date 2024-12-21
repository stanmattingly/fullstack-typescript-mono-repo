#!/usr/bin/env bash

# Create an S3 bucket for dev
awslocal s3 mb s3://dev-bucket --region us-east-1

echo "S3 bucket 'dev-bucket' created successfully."

# Create an SQS queue for dev
awslocal sqs create-queue --queue-name dev-queue --region us-east-1

echo "SQS queue 'dev-queue' created successfully."

# Optional: List the queues to verify creation
awslocal sqs list-queues --region us-east-1