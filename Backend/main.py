from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

from database import Base, engine, SessionLocal
from models import Campaign

# Create tables automatically
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Seed database if empty
@app.on_event("startup")
def seed_data():
    db = SessionLocal()
    if db.query(Campaign).count() == 0:
        campaigns = [
            Campaign(name='Summer Sale', status='Active', clicks=150, cost=45.99, impressions=1000),
            Campaign(name='Black Friday', status='Paused', clicks=320, cost=89.50, impressions=2500),
            Campaign(name='Winter Deals', status='Active', clicks=200, cost=55.75, impressions=1800),
            Campaign(name='New Year Blast', status='Paused', clicks=450, cost=120.00, impressions=3000),
            Campaign(name='Clearance Sale', status='Active', clicks=180, cost=60.00, impressions=1500),
            Campaign(name='Diwali Ads', status='Paused', clicks=230, cost=70.10, impressions=2100),
            Campaign(name='Festival Offers', status='Active', clicks=310, cost=99.99, impressions=2800),
            Campaign(name='Flash Sale', status='Paused', clicks=170, cost=40.50, impressions=900),
            Campaign(name='Holi Discount', status='Active', clicks=260, cost=85.25, impressions=1900),
            Campaign(name='Mega Promo', status='Paused', clicks=390, cost=110.45, impressions=3200),
        ]
        db.add_all(campaigns)
        db.commit()
    db.close()

@app.get("/campaigns")
def get_campaigns(db: Session = Depends(get_db), status: str | None = None):
    query = db.query(Campaign)
    if status:
        query = query.filter(Campaign.status == status)
    return query.all()
