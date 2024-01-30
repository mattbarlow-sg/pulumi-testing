import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

const config = new pulumi.Config();

const roleToAssumeARN = config.require("pulumi-testing:roleToAssumeARN");

const provider = new aws.Provider("myprovider", {
    assumeRole: {
        roleArn: roleToAssumeARN,
        sessionName: "PulumiSession",
    },
});

const bucket = new aws.s3.Bucket("mybucket", {}, { provider: provider });

export const bucketName = bucket.id;
