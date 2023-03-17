import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import TreeNode from "./treeNode";

const Sidebar = ({ pageTitle, children }) => {
  const data = useStaticQuery(graphql`
    query {
      allMdx(
        filter: { fields: { type: { eq: "notes" } } }
        sort: { frontmatter: { date: DESC } }
      ) {
        edges {
          node {
            fields {
              slug
              title
            }
          }
        }
      }
      allDirectory(filter: { sourceInstanceName: { eq: "notes" } }) {
        edges {
          node {
            relativePath
          }
        }
      }
    }
  `);

  const tree = data.allMdx.edges.reduce(
    (
      accu,
      {
        node: {
          fields: { slug, title },
        },
      }
    ) => {
      const parts = slug.split("/");

      let { items: prevItems } = accu;

      const slicedParts = parts.slice(0, -1);

      for (const part of slicedParts) {
        let tmp = prevItems && prevItems.find(({ label }) => label === part);

        if (tmp) {
          if (!tmp.items) {
            tmp.items = [];
          }
        } else {
          tmp = { label: part, items: [] };
          prevItems.push(tmp);
        }
        prevItems = tmp.items;
      }
      const slicedLength = parts.length - 1;

      const existingItem = prevItems.find(
        ({ label }) => label === parts[slicedLength]
      );

      if (existingItem) {
        existingItem.url = slug;
        existingItem.title = title;
      } else {
        prevItems.push({
          label: parts[slicedLength],
          url: slug,
          items: [],
          title,
        });
      }
      return accu;
    },
    { items: [] }
  );

  return (
    <div>
      <TreeNode {...tree} />
    </div>
  );
};

export default Sidebar;
