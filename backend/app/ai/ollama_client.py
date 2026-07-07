import json
import re

from ollama import chat

from app.ai.prompts import COMPLAINT_ANALYSIS_PROMPT


def analyze_complaint(
    title: str,
    description: str
) -> dict:
    """
    Analyze complaint using Ollama and return structured JSON.
    """

    prompt = f"""
{COMPLAINT_ANALYSIS_PROMPT}

Complaint Title:
{title}

Complaint Description:
{description}
"""

    response = chat(
        model="llama3.2:3b",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    content = response["message"]["content"].strip()

    print("\n===== OLLAMA RESPONSE =====")
    print(content)
    print("===========================\n")

    try:
        # First try parsing directly
        return json.loads(content)

    except json.JSONDecodeError:
        try:
            # Extract JSON if wrapped in markdown or extra text
            match = re.search(r"\{.*\}", content, re.DOTALL)

            if match:
                return json.loads(match.group())

        except Exception:
            pass

    # Fallback
    return {
        "category": "Other",
        "department": "General Administration",
        "priority": "Medium",
        "summary": content,
        "suggested_action": "Manual review required."
    }