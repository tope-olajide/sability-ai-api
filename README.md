# 🚀 Getting Started with Sability AI API

Welcome to Sability AI API! This guide will walk you through the setup process and explain how to create various models for tasks like Grammar Checking, Paraphrasing, Summarization, Translation, and Content Generation.

Before you get started, make sure you have the following prerequisites:

1. **MindsDB Account:** Sign up for a MindsDB account if you don't have one yet. You'll need it to create and manage your models.

2. **Node.js:** Ensure you have Node.js installed on your system.

Now, let's dive into creating models for different tasks:

## Grammar Checker Model 📝

To create a Grammar Checker model, follow these steps:

1. Visit [MindsDB Cloud Editor](https://cloud.mindsdb.com/editor).

2. Use the following script to create your Grammar Checker model:

```bash
CREATE MODEL mindsdb.grammar_checker
PREDICT response
USING
engine = 'openai',
temperature = 0.0,
max_tokens = 300,
-- api_key = 'your openai key', (Note: MindsDB cloud accounts provide a default key)
model_name = 'gpt-4', -- You can also use 'gpt-3.5-turbo' or 'text-davinci-003,' but gpt-4 provides more accurate responses.
prompt_template =
'
Hello, ChatGPT! You are a professional grammar checker application similar to Grammarly. Your task is to detect grammatical errors within the text enclosed by triple quotes. Please refrain from making automatic corrections to any grammar errors. Avoid providing explanations for your findings. Do not make alterations to the provided text. Instead, identify any incorrect grammar within the text by wrapping it in an HTML "span" element. The format for the span element should be as follows:
<span class="highlight" data-corrected="CORRECTED_GRAMMAR_HERE" data-error-type="ERROR_TYPE_HERE">INCORRECT_GRAMMAR</span>

Replace "CORRECTED_GRAMMAR_HERE" with the accurate grammar, "ERROR_TYPE_HERE" with the type of error you have identified, and "INCORRECT_GRAMMAR" with the incorrect grammar in the text. If no grammar errors are found, simply return the given text as it is, without adding any context, explanations, quotes, or additional information to your response.

"""{{text}}"""
'
```

## Paraphraser Model 🔁

To create a Paraphraser model, use the following script:

```bash
CREATE MODEL mindsdb.paraphraser
PREDICT response
USING
engine = 'openai',
max_tokens = 300,
-- api_key = 'your openai key', (Note: MindsDB cloud accounts provide a default key)
model_name = 'text-davinci-003', -- You can also use 'gpt-4' or 'gpt-3.5-turbo.'
prompt_template = 'Don’t justify your answers.
Please rephrase the following text in {{mode}} tone.
Original Text: {{text}}
Ensure that the meaning and context remain intact while expressing the ideas in a different manner.';
```

## Summarizer Model 📃

To create a Summarizer model, execute the following script:

```bash
CREATE MODEL mindsdb.summarizer_001
PREDICT response
USING
engine = 'openai',
max_tokens = 300,
model_name = 'text-davinci-003', 
prompt_template = 'Don’t justify your answers.
Please provide a {{length}} summary of the following text: {{text}}
```

## Translator Model 🌍

Create a Translator model using this script:

```bash
CREATE MODEL mindsdb.translator
PREDICT response
USING
engine = 'openai',
max_tokens = 300,
model_name = 'text-davinci-003',
prompt_template = 'Don’t justify your answers.
Please translate the text delimited by triple quotes to {{language}} Language
"""{{text}}"""
'
```

## Content Generator Model 📄

For a Content Generator model, use the following script:

```bash
CREATE MODEL mindsdb.content_generator_001
PREDICT response
USING
engine = 'openai',
max_tokens = 300,
-- api_key = 'your openai key', (Note: MindsDB cloud accounts provide a default key)
model_name = 'text-davinci-003', -- You can also use 'text-davinci-003' or 'gpt-3.5-turbo.'
prompt_template = 'Don’t justify your answers.

Write a comprehensive article about the text delimited by triple quotes. 
Include background information, key points, and any relevant statistics or case studies to provide a well-rounded understanding of the text delimited by triple quotes.
Generate your response in html
"""{{text}}"""
';
```

Now that you've created your models, you're ready to set up the API.

## Installation 🛠️

1. Clone the Sability AI API repository:

```bash
git clone https://github.com/tope-olajide/sability-ai-api.git
```

2. Install NPM packages:

```bash
cd sability-ai-api
yarn install
```

or

```bash
npm install
```

3. Create a `.env` file at the root directory and enter your MindsDB email and password:

```bash
MINDS_DB_USER="Your_MindsDB_Email_Here"
MINDS_DB_PASSWORD="Your_Password_Here"
```

4. Make sure you change all the model names in the `src/app` to match the names of the models you created.

5. Start the server:

```bash
npm run dev
```

That's it! You're all set to use the Sability AI API for various language tasks. Enjoy exploring the power of AI-driven natural language processing.

## License 📜

Distributed under the MIT License. See `LICENSE.txt` for more information.

## Acknowledgments 🙏

- [MindsDB](https://mindsdb.com)
- [Render](https://render.com)

Feel free to reach out if you have any questions or need assistance. Happy coding! 🚀✨