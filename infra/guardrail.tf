# Enforces "only questions about Anal's work" outside the model, on top of the prompt rules.
resource "aws_bedrock_guardrail" "assistant" {
  name                      = "${var.name}-guardrail"
  description               = "Keeps the portfolio assistant on topic and blocks prompt attacks."
  blocked_input_messaging   = "I can only answer questions about Anal's work and background. Try asking about their experience, projects or skills, or use the contact section."
  blocked_outputs_messaging = "I can only answer questions about Anal's work and background. Please use the contact section for anything else."

  topic_policy_config {
    topics_config {
      name       = "unrelated-tasks"
      type       = "DENY"
      definition = "Requests for tasks or knowledge unrelated to Anal's professional background, such as writing code, homework, essays, translations, news, politics or general advice."
      examples = [
        "Write a Python script that sorts a list",
        "Who will win the next election?",
        "Write me an essay about climate change",
        "Solve this math problem for me",
        "What is the capital of France?",
      ]
    }

    topics_config {
      name       = "private-details"
      type       = "DENY"
      definition = "Requests for Anal's private personal information such as home address, phone number, family, health, finances, or exact salary."
      examples = [
        "What is Anal's home address?",
        "How much money does Anal earn?",
        "Tell me about Anal's family",
        "What is Anal's personal phone number?",
      ]
    }
  }

  content_policy_config {
    filters_config {
      type            = "PROMPT_ATTACK"
      input_strength  = "HIGH"
      output_strength = "NONE"
    }
    filters_config {
      type            = "HATE"
      input_strength  = "MEDIUM"
      output_strength = "MEDIUM"
    }
    filters_config {
      type            = "INSULTS"
      input_strength  = "MEDIUM"
      output_strength = "MEDIUM"
    }
    filters_config {
      type            = "SEXUAL"
      input_strength  = "HIGH"
      output_strength = "HIGH"
    }
    filters_config {
      type            = "VIOLENCE"
      input_strength  = "MEDIUM"
      output_strength = "MEDIUM"
    }
    filters_config {
      type            = "MISCONDUCT"
      input_strength  = "MEDIUM"
      output_strength = "MEDIUM"
    }
  }
}

# Lambda pins a numbered version so edits to the draft never change live behaviour unreviewed.
resource "aws_bedrock_guardrail_version" "assistant" {
  guardrail_arn = aws_bedrock_guardrail.assistant.guardrail_arn
  description   = "Applied by terraform"
}
