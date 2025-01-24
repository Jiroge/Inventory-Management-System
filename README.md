# Inventory Management Setup Guide

## Settings
- **Frontend**: ReactJS
- **Backend**: ExpressJS
- **Database**: MySQL
- **Node.js Version**: 21.1.0

---

## 1. Set Up Database

To set up the database, follow these steps:

1. **Create the database:**

    ```sql
    CREATE DATABASE inventory_management;
    USE inventory_management;
    ```

2. **Create the `items` table:**

    ```sql
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
    ```

3. **Insert sample data (20 records):**

    ```sql
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

---

## 2. Start Running Backend

### Step 1: Replace Database Password

- Open the `.env` file in your `backend` directory.
- Replace the placeholder `DB_PASSWORD` with your MySQL password.

### Step 2: Navigate to the Backend Directory

In your terminal, run:

```bash
cd backend
```

### Step 3: Install Dependencies

Run the following command to install the necessary packages:

```bash
npm install
```

### Step 4: Start the Backend Server

After the dependencies are installed, start the server with:

```bash
node server.js
```

## 3. Start Running Frontend

### Step 1: Replace Backend API URL
- Open the frontend/config/config.js file.
- Replace the backend API path with the correct URL to your backend server.
  
### Step 2: Navigate to the Frontend Directory

In your terminal, run:

```bash
cd frontend
```

### Step 3: Install Dependencies

Run the following command to install the necessary frontend packages:

```bash
npm install
```
### Step 4: Start the Frontend Server

Start the frontend server by running:

```bash
npm run dev
```

## Final Steps
Once both the backend and frontend are running, your application should be live! You can open your browser and access the frontend to interact with the inventory management system.