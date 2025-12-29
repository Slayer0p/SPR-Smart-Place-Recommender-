import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(
    base_url="https://router.huggingface.co/v1",
    api_key=os.getenv("HF_TOKEN")
)

def call_ai(prompt: str) -> str:
    try:
        response = client.chat.completions.create(
            model="deepseek-ai/DeepSeek-V3.2",
            messages=[
                {"role": "system", "content": "You are a strict JSON-only AI agent."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3
        )

        message = response.choices[0].message.content

        if not message or not message.strip():
            raise ValueError("Empty response from AI")

        return message.strip()

    except Exception as e:
        raise RuntimeError(f"DeepSeek inference failed: {str(e)}")
