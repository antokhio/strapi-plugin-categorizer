export default {
  type: "admin",
  routes: [
    {
      method: "POST",
      path: "/",
      handler: "categorizer.find",
    },
  ],
};
