const slugify = require(`@sindresorhus/slugify`);
const { createFilePath } = require("gatsby-source-filesystem");
const path = require("path");

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `Mdx`) {
    const parent = getNode(node.parent);
    const type = parent.sourceInstanceName;
    const slugTemp = createFilePath({
      node,
      getNode,
      basePath: `notes`,
      trailingSlash: false,
    });
    const slugArr = slugTemp.slice(1).split("/");
    const slug = slugArr
      .map((item) => {
        return slugify(item);
      })
      .join("/");
    createNodeField({
      node,
      name: "slug",
      value: slug,
    });
    createNodeField({ node, name: "title", value: parent.name });
    createNodeField({
      node,
      name: "type",
      value: type,
    });
  }
};
