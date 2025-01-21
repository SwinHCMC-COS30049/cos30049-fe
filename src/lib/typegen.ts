import { writeFile } from "fs/promises";
import openapiTS, { astToString } from "openapi-typescript";

const generateTypes = async () => {
  const swaggerApiUrl = process.env.NEXT_PUBLIC_SWAGGER_API_URL;
  console.log("swaggerApiUrl", swaggerApiUrl);
  if (!swaggerApiUrl) {
    return;
  }
  const ast = await openapiTS(new URL(swaggerApiUrl));
  const contents = astToString(ast);
  await writeFile("src/lib/types.ts", contents, { flag: "w+" });
};

generateTypes();
