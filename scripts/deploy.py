import boto3
import os
import pathlib

def upload_build(path, bucketname, s3):
    for root, _dirs, files in os.walk(path):
        for file in files:
            p = pathlib.PureWindowsPath(os.path.join(root, file))
            s3.upload_file(p, bucketname, f"{p.as_posix().replace(path, "")}")

def deploy():
    bucket = os.environ.get("SITE_BUCKET_NAME")
    s3 = boto3.client(
        's3', 
        aws_access_key_id=os.environ.get("AWS_ACCESS_KEY_ID"),
        aws_secret_access_key= os.environ.get("AWS_SECRET_ACCESS_KEY"),
    )
    upload_build("build/", bucket, s3)
        
deploy()
