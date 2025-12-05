CREATE TABLE campaigns (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  status VARCHAR(50),
  clicks INT,
  cost FLOAT,
  impressions INT
);

INSERT INTO campaigns (name, status, clicks, cost, impressions) VALUES
('Summer Sale', 'Active', 150, 45.99, 1000),
('Black Friday', 'Paused', 320, 89.50, 2500),
('Winter Deals', 'Active', 200, 55.75, 1800),
('New Year Blast', 'Paused', 450, 120.00, 3000),
('Clearance Sale', 'Active', 180, 60.00, 1500),
('Diwali Ads', 'Paused', 230, 70.10, 2100),
('Festival Offers', 'Active', 310, 99.99, 2800),
('Flash Sale', 'Paused', 170, 40.50, 900),
('Holi Discount', 'Active', 260, 85.25, 1900),
('Mega Promo', 'Paused', 390, 110.45, 3200);
