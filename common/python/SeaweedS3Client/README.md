# Seaweed S3 Client

A lightweight Python package to interact with S3-compatible storage systems. This package simplifies tasks such as managing buckets, uploading/downloading files, and generating presigned URLs.

---

## Installation

### Direct Installation

To install the package directly, use the following command:

```bash
pip install git+https://git@github.com/WildCayote/AutoML.git#subdirectory=common\python\SeaweedS3Client
```

### Using requirements.txt

To integrate this package into your project, add the following line to your requirements.txt file:

```perl
git+https://git@github.com/WildCayote/AutoML.git#subdirectory=common\python\SeaweedS3Client
```

Then, install all dependencies using:

```bash
pip install -r requirements.txt
```

## Usage

### Getting Started

1. Import the S3Handler class
2. Import the S3Handler class from the package to start interacting with your SeaweedFS or S3-compatible storage.Initialize the Handler : Provide your S3-compatible endpoint, access key, and secret key.

3. Perform Operations
   Use the provided methods for various storage operations like listing buckets, uploading/downloading files, and more.

### Example

```python
from SeaweedS3Client import S3Handler

# Initialize the client
s3 = S3Handler(
    s3_url="https://example.com",
    access_key="your-access-key",
    secret_key="your-secret-key"
)

# List all buckets
buckets = s3.get_buckets()
print(buckets)

# Upload a file
success, response = s3.upload_file("path/to/local/file.txt", "testbucket")
if success:
    print(f"File uploaded successfully! URI: {response}")

# Generate a presigned URL for downloading an object
url = s3.get_presigned_download_url("testbucket", "file.txt")
print(f"Presigned download URL: {url}")
```

## Features

- Bucket Management: Create, list, and delete buckets with ease.

- File Operations: Upload files from local paths or binary buffers and download files as byte streams.

- Presigned URLs: Generate presigned URLs for uploading and downloading objects, allowing temporary access.
