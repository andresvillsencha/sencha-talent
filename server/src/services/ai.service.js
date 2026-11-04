require('dotenv').config();
const OpenAI = require("openai");
const path = require("path");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const fs = require("fs");
const model = "gpt-5-mini";


/*****
 * The following is the prompt to be sent
 */
const systemPrompt = `
    You are an expert technical recruiter.

    Evaluate the candidate's resume against the provided Job Description.

    Use ONLY the information found in the Job Description and Resume. Do not assume skills, experience, education, English level, or location that are not explicitly mentioned.

    Return ONLY valid JSON using this structure:
    {
        "match_percentage": 0,
        "summary": "Short explanation of how well the candidate matches the position.",
        "matching_skills": [
            "Skill found in both the Job Description and Resume"
        ],
        "missing_skills": [
            "Important skill required by the Job Description but not found in the Resume"
        ],
        "experience": {
            "match_percentage": 0,
            "summary": "Short explanation of how the candidate's experience matches the position."
        },
        "education": {
            "match": "yes | partial | no | not_specified",
            "summary": "Short explanation of the candidate's education compared with the Job Description."
        },

        "english_level": {
            "level": "Candidate's English level if explicitly mentioned, otherwise not_specified",
            "meets_requirement": "yes | no | unknown"
        },

        "location": {
            "candidate_location": "Candidate location if available, otherwise not_specified",
            "job_location": "Job location if available, otherwise not_specified",
            "match": "yes | no | unknown"
        },

        "strengths": [
            "Main candidate strength"
        ],

        "concerns": [
            "Main gap or concern"
        ],

        "recommendation": "strong_match | good_match | moderate_match | weak_match"
    }

    Scoring guidelines:

    90-100: Excellent match
    80-89: Strong match
    70-79: Good match with some gaps
    60-69: Partial match
    Below 60: Weak match

    Important rules:

    Never invent information.
    If something is not mentioned in the Resume or Job Description, use "not_specified" or "unknown".
    Required skills should have more weight than optional skills.
    Missing important requirements should reduce the match percentage.
    Keep all explanations short and easy to understand.
    Do not include markdown.
    Do not include any text before or after the JSON.
`;

/**
 * 
 * @param {*} resumeFile 
 * @param {*} jdFile 
 * @returns 
 */
async function validateResume(resumeFile, jdFile) {
    // Read Files
        const resumePath = path.resolve("./files/resume", resumeFile);
        const jdPath = path.resolve("./files/jd", jdFile);


        const uploadedResume = await openai.files.create({
            file: fs.createReadStream(resumePath),
            purpose: "user_data"
        });
        console.log("Resume uploaded:", uploadedResume.id);
        
        const uploadedJd = await openai.files.create({
            file: fs.createReadStream(jdPath),
            purpose: "user_data"
        });
        console.log("JD uploaded:", uploadedJd.id);

        
    // Prepare prompt
        const prompt = systemPrompt.trim();

        const response = await openai.responses.create({
            model: model,

            instructions: prompt,

            input: [ {
                role: "user",
                content: [ {
                    type: "input_text",
                    text: "The following file is the candidate resume:"
                }, {
                    type: "input_file",
                    file_id: uploadedResume.id
                }, {
                    type: "input_text",
                    text: "The following file is the job description:"
                }, {
                    type: "input_file",
                    file_id: uploadedJd.id
                }, {
                    type: "input_text",
                    text: "Compare the resume against the job description."
                } ]
            } ],
        });

        const result = JSON.parse(response.output_text);

        console.log("Validation result:");
        console.log(result);

    return result;//response;
}



module.exports = {
    validateResume
};