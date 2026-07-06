from fastapi import HTTPException, status


def get_current_user() -> str:
    return "demo-user"
