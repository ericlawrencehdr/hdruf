import { GetObjectCommand, ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";
import {
  getSignedUrl,
  S3RequestPresigner,
} from "@aws-sdk/s3-request-presigner"

// const client = new S3Client({});

export const getModelData = async () => {
  const expiresInDefault = 43200 // 12 hours
  const bucket = process.env.AWS_BUCKET_ID
  const envKey = process.env.AWS_ENV_KEY ?? 'prod'
  // const region = process.env.AWS_REGION
  const client = new S3Client({});

  const dataKey = `${envKey}/UF_data.csv`
  const dataCommand = new GetObjectCommand({ Bucket: bucket, Key: dataKey });
  const dataUrl = await getSignedUrl(client, dataCommand, { expiresIn: expiresInDefault });

  const modelKey = `${envKey}/UF_model.glTF`
  const modelCommand = new GetObjectCommand({ Bucket: bucket, Key: modelKey });
  const modelUrl = await getSignedUrl(client, modelCommand, { expiresIn: expiresInDefault });

  const modelKeyLo = `${envKey}/toyota_4runner.glb`
  const modelCommandLo = new GetObjectCommand({ Bucket: bucket, Key: modelKeyLo });
  const modelUrlLo = await getSignedUrl(client, modelCommandLo, { expiresIn: expiresInDefault });

  const result = {
    data: dataUrl,
    model: modelUrl,
    modelLo: modelUrlLo
  }
  return result
}

// export const listBucket = async () => {

//   const command = new ListObjectsV2Command({
//     Bucket: process.env.AWS_BUCKET_ID,
//     // The default and maximum number of keys returned is 1000. This limits it to
//     // one for demonstration purposes.
//     MaxKeys: 1,
//   });

//   try {
//     let isTruncated = true;

//     console.log("Your bucket contains the following objects:\n")
//     let contents = "";

//     while (isTruncated) {
//       const { Contents, IsTruncated, NextContinuationToken } = await client.send(command);
//       if (!Contents) throw new Error("No contents found in bucket")
//       const contentsList = Contents.map((c) => ` • ${c.Key}`).join("\n");
//       contents += contentsList + "\n";
//       isTruncated = IsTruncated ?? false;
//       command.input.ContinuationToken = NextContinuationToken;
//     }
//     console.log(contents);
//   } catch (err) {
//     console.error(err);
//   }
// };

