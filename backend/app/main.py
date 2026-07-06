from fastapi import FastAPI

app = FastAPI(title="JanMitra AI API")

@app.get("/")
def read_root():
    return {"message": "JanMitra AI backend is running"}
