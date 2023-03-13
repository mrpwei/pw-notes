import * as React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../../components/layout";
import Seo from "../../components/seo";

const NotesPage = ({ data }) => {
  return (
    <Layout pageTitle="My Notes">
      {data.allMdx.nodes.map((node) => (
        <article key={node.id}>
          <h2>
            <Link to={`/notes/${node.fields.slug}`}>{node.fields.title}</Link>
          </h2>
          <p>{node.excerpt}</p>
        </article>
      ))}
    </Layout>
  );
};

export const query = graphql`
  query {
    allMdx(
      filter: { fields: { type: { eq: "notes" } } }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        fields {
          slug
          title
        }
        id
        excerpt
      }
    }
  }
`;

export const Head = () => <Seo title="My Notes" />;

export default NotesPage;
