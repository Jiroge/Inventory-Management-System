# Settings
Frontend ReactJS

Backend ExpressJS

Database MySQL

Node vesrion 21.1.0

# Start running Database 

``` SQL
-- Create Database
CREATE DATABASE inventory_management;
USE inventory_management;

-- Create Items Table
CREATE TABLE items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    item_type VARCHAR(100) NOT NULL,
    item_amount INT NOT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_editor VARCHAR(100) NOT NULL,
    last_editor VARCHAR(100) NOT NULL,
    item_status TINYINT(1) DEFAULT 1
);

-- Insert Sample Data (20 records)
INSERT INTO items (name, item_type, item_amount, created_editor, last_editor) VALUES
('Laptop Dell XPS', 'Electronics', 15, 'Admin', 'Admin'),
('iPhone 13', 'Electronics', 22, 'Admin', 'Admin'),
('Gaming Mouse', 'Computer Accessories', 50, 'Admin', 'Admin'),
('Mechanical Keyboard', 'Computer Accessories', 35, 'Admin', 'Admin'),
('Monitor LG 27"', 'Electronics', 18, 'Admin', 'Admin'),
('Wireless Headphones', 'Electronics', 40, 'Admin', 'Admin'),
('External SSD 1TB', 'Storage', 25, 'Admin', 'Admin'),
('Graphic Card RTX 3080', 'Computer Parts', 10, 'Admin', 'Admin'),
('Tablet Samsung', 'Electronics', 20, 'Admin', 'Admin'),
('Smart Watch', 'Wearables', 30, 'Admin', 'Admin'),
('Wireless Charger', 'Accessories', 55, 'Admin', 'Admin'),
('Power Bank', 'Accessories', 45, 'Admin', 'Admin'),
('Bluetooth Speaker', 'Audio', 35, 'Admin', 'Admin'),
('Router WiFi 6', 'Networking', 25, 'Admin', 'Admin'),
('Action Camera', 'Electronics', 15, 'Admin', 'Admin'),
('Drone DJI', 'Electronics', 8, 'Admin', 'Admin'),
('Smart Home Hub', 'Smart Devices', 20, 'Admin', 'Admin'),
('Digital Camera', 'Electronics', 12, 'Admin', 'Admin'),
('Portable SSD', 'Storage', 30, 'Admin', 'Admin'),
('Gaming Headset', 'Computer Accessories', 25, 'Admin', 'Admin');
```

# Start running Backend

replace DB_PASSWORD in .env file with your own password

```
cd backend
npm install
node server.js
```

# Start running Frontend

replace backend API in path frontend/config/config.js 

```
cd frontend
npm install
npm run dev
```