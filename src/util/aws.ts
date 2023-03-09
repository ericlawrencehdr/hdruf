import { ListBucketsCommand, ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";

const client = new S3Client({});

export const listBucket = async () => {

  const command = new ListObjectsV2Command({
    Bucket: process.env.AWS_BUCKET_ID,
    // The default and maximum number of keys returned is 1000. This limits it to
    // one for demonstration purposes.
    MaxKeys: 1,
  });

  try {
    let isTruncated = true;

    console.log("Your bucket contains the following objects:\n")
    let contents = "";

    while (isTruncated) {
      const { Contents, IsTruncated, NextContinuationToken } = await client.send(command);
      if (!Contents) throw new Error("No contents found in bucket")
      const contentsList = Contents.map((c) => ` • ${c.Key}`).join("\n");
      contents += contentsList + "\n";
      isTruncated = IsTruncated ?? false;
      command.input.ContinuationToken = NextContinuationToken;
    }
    console.log(contents);
  } catch (err) {
    console.error(err);
  }
};

