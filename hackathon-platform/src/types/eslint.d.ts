declare module '@next/eslint-plugin-next' {
  const plugin: any;
  export default plugin;
}

declare module '@eslint/js' {
  const js: {
    configs: {
      recommended: any;
    };
  };
  export default js;
}
