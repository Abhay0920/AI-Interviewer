/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://neondb_owner:tXjWoc0rm9KF@ep-bitter-river-a5rgrajp.us-east-2.aws.neon.tech/myprojectdb?sslmode=require',
    }
  };