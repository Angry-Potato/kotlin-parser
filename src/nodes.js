const NODE_TYPES = {
  ROOT_NODE: "root-node",
  PACKAGE_DECLARATION: "package-declaration",
  IMPORT_STATEMENT: "import-statement",
  CLASS_DECLARATION: "class-declaration",
  PRIMARY_CONSTRUCTOR: "primary-constructor",
  PARAMETER: "parameter",
  MODIFIER: "modifier",
  ANNOTATION: "annotation",
  ARG: "arg"
};

const nodes = {
  [NODE_TYPES.ROOT_NODE]: require(`./nodes/${NODE_TYPES.ROOT_NODE}`),
  [NODE_TYPES.PACKAGE_DECLARATION]: require(`./nodes/${NODE_TYPES.PACKAGE_DECLARATION}`),
  [NODE_TYPES.IMPORT_STATEMENT]: require(`./nodes/${NODE_TYPES.IMPORT_STATEMENT}`),
  [NODE_TYPES.CLASS_DECLARATION]: require(`./nodes/${NODE_TYPES.CLASS_DECLARATION}`),
  [NODE_TYPES.PRIMARY_CONSTRUCTOR]: require(`./nodes/${NODE_TYPES.PRIMARY_CONSTRUCTOR}`),
  [NODE_TYPES.PARAMETER]: require(`./nodes/${NODE_TYPES.PARAMETER}`),
  [NODE_TYPES.MODIFIER]: require(`./nodes/${NODE_TYPES.MODIFIER}`),
  [NODE_TYPES.ANNOTATION]: require(`./nodes/${NODE_TYPES.ANNOTATION}`),
  [NODE_TYPES.ARG]: require(`./nodes/${NODE_TYPES.ARG}`)
};

const isRootNode = node => node.anns && node.imports && node.decls;

const isPkgDeclaration = node => node.mods && node.names;

const isImportStatement = node =>
  node && node.hasOwnProperty("wildcard") && node.names;

const isClassDeclaration = node => node.form == "CLASS";

const isPrimaryConstructor = node => node.mods && node.params;

const isParameter = node => node.mods && node.name && node.type;

const isModifier = node => node.keyword || node.anns;

const isAnnotation = node => node.names && node.typeArgs && node.args;

const isArg = node => node.hasOwnProperty("asterisk") && node.expr;

const assignType = node => {
  if (!node) {
    throw new Error(`Undefined node encountered`);
  }

  if (isRootNode(node)) {
    return { ...node, astType: NODE_TYPES.ROOT_NODE };
  } else if (isPkgDeclaration(node)) {
    return { ...node, astType: NODE_TYPES.PACKAGE_DECLARATION };
  } else if (isImportStatement(node)) {
    return { ...node, astType: NODE_TYPES.IMPORT_STATEMENT };
  } else if (isClassDeclaration(node)) {
    return { ...node, astType: NODE_TYPES.CLASS_DECLARATION };
  } else if (isPrimaryConstructor(node)) {
    return { ...node, astType: NODE_TYPES.PRIMARY_CONSTRUCTOR };
  } else if (isParameter(node)) {
    return { ...node, astType: NODE_TYPES.PARAMETER };
  } else if (isModifier(node)) {
    return { ...node, astType: NODE_TYPES.MODIFIER };
  } else if (isAnnotation(node)) {
    return { ...node, astType: NODE_TYPES.ANNOTATION };
  } else if (isArg(node)) {
    return { ...node, astType: NODE_TYPES.ARG };
  }

  throw new Error(
    `Unsupported node encountered: ${JSON.stringify(node, null, 2)}`
  );
};

module.exports = {
  NODE_TYPES,
  assignType,
  nodes
};
