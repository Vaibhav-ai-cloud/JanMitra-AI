from app.ai.ollama_client import analyze_complaint


def analyze_new_complaint(
    title: str,
    description: str
) -> dict:
    """
    Business layer for AI complaint analysis.
    """

    return analyze_complaint(
        title=title,
        description=description
    )