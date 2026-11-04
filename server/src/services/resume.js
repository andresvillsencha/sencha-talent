
require('dotenv').config();

const OpenAI = require("openai/index.js");
const FileSystem = require("fs");
const model = "gpt-5-mini";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function validateResume() {
  let result = null;
  console.log("start process");
  
  try {
    // Read both files
      const resumeFileStream = FileSystem.createReadStream("./files/resume.pdf");
      const jdFileStream = FileSystem.createReadStream("./files/jd.pdf");

    // Prepare both PDF files to be sent to OpenAI
      const resumeFile = await openai.files.create({
        file: resumeFileStream,
        purpose: "user_data"
      });

      const jobDescriptionFile = await openai.files.create({
        file: jdFileStream,
        purpose: "user_data"
      });

      console.log("Files Ready");

    // The Prompt
      const prompt=`You are a resume screening assistant.
        Compare the candidate resume against the job description.
        Return only valid JSON in this format:
        {
          "matchPercentage": 0
        }
        The matchPercentage must be an integer between 0 and 100.

        Evaluate:
        - Required skills
        - Relevant professional experience
        - Years of experience
        - Education and certifications
        - Responsibilities
        - Missing mandatory requirements

        Only use information explicitly included in the documents.
        Do not invent qualifications or experience.`.trim();


    console.log("Contacting Open AI");

    // Connect and Send both files to the model
      const response = await openai.responses.create({
        model: model,

        instructions: prompt,

        input: [
          {
            role: "user",
            content: [
              {
                type: "input_text",
                text: "The following file is the candidate resume:"
              },
              {
                type: "input_file",
                file_id: resumeFile.id
              },
              {
                type: "input_text",
                text: "The following file is the job description:"
              },
              {
                type: "input_file",
                file_id: jobDescriptionFile.id
              },
              {
                type: "input_text",
                text: "Compare the resume against the job description."
              }
            ]
          }
        ],

        text: {
          format: {
            type: "json_schema",
            name: "resume_match",
            strict: true,
            schema: {
              type: "object",
              properties: {
                matchPercentage: {
                  type: "integer",
                  minimum: 0,
                  maximum: 100
                }
              },
              required: ["matchPercentage"],
              additionalProperties: false
            }
          }
        }
      });

    const result = JSON.parse(response.output_text);

    console.log("Validation result:");
    console.log(result);

    return result;
  } catch (error) {
    console.error("Error validating resume:");

    if (error instanceof OpenAI.APIError) {
      console.error("Status:", error.status);
      console.error("Message:", error.message);
      console.error("Request ID:", error.request_id);
    } else {
      console.error(error);
    }
  }
}
module.exports = {
    validateResume
};
