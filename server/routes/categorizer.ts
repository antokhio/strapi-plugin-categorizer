export default {
  type: "admin",
  routes: [
    {
      method: "GET",
      path: "/",
      handler: "categorizer.find",
    },
  ],
};
