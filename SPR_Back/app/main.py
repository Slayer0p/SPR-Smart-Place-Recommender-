from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.recommend import router as recommend_router

app = FastAPI(
    title="Smart Place Recommender",
    version="1.0"
)

# ✅ CORS CONFIGURATION (VERY IMPORTANT)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8080",
        "http://127.0.0.1:8080",
        "https://smartplacerecommender.vercel.app",
        "https://spr-smart-place-recommender.vercel.app"
    ],  # frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ API ROUTES
app.include_router(recommend_router)

@app.get("/")
def root():
    return {"status": "Smart Place Recommender running"}
