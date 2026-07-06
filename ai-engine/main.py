from fastapi import FastAPI

app = FastAPI(title="JanMitra AI Engine")

@app.get("/")
def health_check():
    return {"status": "AI engine ready"}
