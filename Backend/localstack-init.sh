#!/bin/bash

echo "++++++++++ FILE Triggered +++++++++++++"

echo "Waiting for LocalStack to be ready..."


# Set dummy AWS credentials for LocalStack
export AWS_ACCESS_KEY_ID=dummy
export AWS_SECRET_ACCESS_KEY=dummy

# Wait until LocalStack is fully started
until curl -s http://localstack:4566 > /dev/null; do
  echo "Waiting for LocalStack to be ready..."
  sleep 2
done

# Create S3 bucket
aws --endpoint-url=http://localhost:4566 s3api create-bucket --bucket local-development-bucket

# Apply CORS configuration to the bucket
aws --endpoint-url=http://localhost:4566 s3api put-bucket-cors --bucket local-development-bucket --cors-configuration '{
  "CORSRules": [{
    "AllowedOrigins": ["*"],
    "AllowedMethods": ["PUT", "GET"],
    "AllowedHeaders": ["*"]
  }]
}'

echo "Bucket and CORS configuration completed."
