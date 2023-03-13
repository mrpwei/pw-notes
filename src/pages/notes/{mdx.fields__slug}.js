import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../../components/layout";
import Seo from "../../components/seo";

const NotePost = ({ data, children }) => {
  return <Layout pageTitle={data.mdx.fields.title}>{children}</Layout>;
};

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      fields {
        slug
        title
      }
    }
    directory {
      relativeDirectory
    }
  }
`;

export const Head = ({ data }) => <Seo title={data.mdx.fields.title} />;

export default NotePost;
