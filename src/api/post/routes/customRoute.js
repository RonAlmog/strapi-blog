module.exports = {
  routes: [
    {
      method: "GET",
      path: "/custom",
      handler: "post.customAction",
      config: {
        auth: false,
      },
    },
  ],
};
