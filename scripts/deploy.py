import boto3

def deploy():
    s3 = boto3.client('s3')
    s3.upload_file('index.html', 'mybucket', 'index.html')