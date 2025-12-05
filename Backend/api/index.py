from Backend.main import app  # import your FastAPI app

# Vercel handler (do not change)
from mangum import Mangum
handler = Mangum(app)
