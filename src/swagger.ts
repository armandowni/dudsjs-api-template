import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "TINQJS API WITH SWAGGER",
      version: "1.0.0",
    },
  },
  servers: [
    {
      url: 'http://localhost:8000/api/v1',
      description: 'Development server',
    },
  ],
  apis: ["./src/routes/*.ts"],
};

const specs = swaggerJsdoc(options);

export default specs;
