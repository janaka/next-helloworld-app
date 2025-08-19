import type { OpenNextConfig } from "@opennextjs/aws/types/open-next.js";
export default {
  // In this case, the default server is meant to run as a classic Node server
  // To execute the server you need to run `node index.mjs` inside `.open-next/server-functions/default`  
  default: {
    runtime: "node",
    wrapper: "node", 
    generateDockerfile: true,
  }
} satisfies OpenNextConfig;
 