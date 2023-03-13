const slugify = require(`@sindresorhus/slugify`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `Mdx`) {
    const parent = getNode(node.parent);
    const relativeDir = parent.relativeDirectory;
    const slug = relativeDir
      ? `${slugify(relativeDir)}/${slugify(parent.name)}`
      : `${slugify(parent.name)}`;
    createNodeField({
      node,
      name: "slug",
      value: slug,
    });
    createNodeField({
      node,
      name: "title",
      value: parent.name,
    });
  }
};
