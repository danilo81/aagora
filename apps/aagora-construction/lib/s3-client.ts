import { S3Client } from "@aws-sdk/client-s3";

export function getS3Client(): S3Client {
    return new S3Client({
        region: "auto",
        endpoint: process.env.CLOUDFLARE_R2_ENDPOINT!,
        credentials: {
            accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
            secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
        },
    });
}
