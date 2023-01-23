import React from "react";
import { Layout } from "../../components/Layout";
import { NewPost } from "../../components/NewPost";

function NewPostPage() {
  return (
    <Layout title="Create new post">
      <NewPost />
    </Layout>
  );
}

export default NewPostPage;
