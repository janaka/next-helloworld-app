import type { OpenNextConfig } from "@opennextjs/aws/types/open-next.js";
const config = {
  // In this case, the default server is meant to run as a classic Node server
  // To execute the server you need to run `node index.mjs` inside `.open-next/server-functions/default`
  default: {
    override: {
      wrapper: "node",
      converter: "node",
      // This is necessary to generate a simple dockerfile and for the generated output to know that it needs to deploy on docker
      // You can also provide a string here (i.e. the content of your Dockerfile) which will be used to create the dockerfile
      // You don't have to provide this if you plan on not using docker, or if you plan on using your own custom dockerfile
      generateDockerfile: true,
    },
  },
  // // You can define multiple functions here, each with its own routes, patterns and overrides
  // functions: {
  //   // In this case both the api route is in lambda and the rest is in node
  //   myFn: {
  //     // Patterns needs to use the glob pattern
  //     patterns: ["api/*"],
  //     routes: ["app/api/test/route", "app/api/test2/route"],
  //   },
  // },
} satisfies OpenNextConfig;
 
export default config;