import React, { useEffect } from "react";
import makeStorageClient from "src/web3storage/Web3StorageClient";
import { Layout } from "../../components/Layout";
import { NewPost } from "../../components/NewPost";

function NewPostPage() {
  async function listUploads() {
    const client = makeStorageClient();
    for await (const upload of client.list()) {
      console.log(
        "WEB3STORAGE",
        `${upload.name} - cid: ${upload.cid} - size: ${upload.dagSize}`
      );
    }
  }

  useEffect(() => {
    listUploads();
  }, []);

  return (
    <Layout title="Create new post">
      <NewPost />
    </Layout>
  );
}

export default NewPostPage;
