-- Pizza Sales Analysis SQL Queries
-- Dataset table assumed: pizza_sales

-- A. KPI's

-- 1. Total Revenue
SELECT SUM(total_price) AS Total_Revenue
FROM pizza_sales;

-- 2. Average Order Value
SELECT SUM(total_price) / COUNT(DISTINCT order_id) AS Average_Order_Value
FROM pizza_sales;

-- 3. Total Sold Pizzas
SELECT SUM(quantity) AS total_pizza_sold
FROM pizza_sales;

-- 4. Total Orders
SELECT COUNT(DISTINCT order_id) AS total_orders
FROM pizza_sales;

-- 5. Average Pizzas Per Order
SELECT CAST(
    CAST(SUM(quantity) AS DECIMAL(10, 2)) /
    CAST(COUNT(DISTINCT order_id) AS DECIMAL(10, 2))
AS DECIMAL(10, 2)) AS Average_Pizza_Per_Order
FROM pizza_sales;

-- B. Daily Trends for Total Orders
SELECT DATENAME(DW, order_date) AS Order_Days,
       COUNT(DISTINCT order_id) AS Total_Order
FROM pizza_sales
GROUP BY DATENAME(DW, order_date);

-- C. Monthly Trends for Total Orders
SELECT DATENAME(MONTH, order_date) AS Order_Months,
       COUNT(DISTINCT order_id) AS Total_Order
FROM pizza_sales
GROUP BY DATENAME(MONTH, order_date);

-- D. Percentage of Sales by Pizza Category
SELECT pizza_category,
       CAST(SUM(total_price) AS DECIMAL(10, 2)) AS total_revenue,
       CAST(SUM(total_price) * 100 / (SELECT SUM(total_price) FROM pizza_sales) AS DECIMAL(10, 2)) AS Percentage_Of_Pizza_Sales
FROM pizza_sales
GROUP BY pizza_category;

-- E. Percentage of Sales by Pizza Size
SELECT pizza_size,
       CAST(SUM(total_price) AS DECIMAL(10, 2)) AS total_revenue,
       CAST(SUM(total_price) * 100 / (SELECT SUM(total_price) FROM pizza_sales) AS DECIMAL(10, 2)) AS Percentage_Of_Pizza_Sales
FROM pizza_sales
GROUP BY pizza_size;

-- F. Total Pizza Sold by Pizza Category
SELECT pizza_category,
       SUM(quantity) AS total_quantity_sold
FROM pizza_sales
GROUP BY pizza_category
ORDER BY total_quantity_sold DESC;

-- G. Top 5 Pizzas by Revenue
SELECT TOP 5 pizza_name,
       SUM(total_price) AS total_revenue
FROM pizza_sales
GROUP BY pizza_name
ORDER BY total_revenue DESC;

-- H. Bottom 5 Pizzas by Revenue
SELECT TOP 5 pizza_name,
       SUM(total_price) AS total_revenue
FROM pizza_sales
GROUP BY pizza_name
ORDER BY total_revenue ASC;

-- I. Top 5 Pizzas by Quantity
SELECT TOP 5 pizza_name,
       SUM(quantity) AS total_quantity
FROM pizza_sales
GROUP BY pizza_name
ORDER BY total_quantity DESC;

-- J. Bottom 5 Pizzas by Quantity
SELECT TOP 5 pizza_name,
       SUM(quantity) AS total_quantity
FROM pizza_sales
GROUP BY pizza_name
ORDER BY total_quantity ASC;

-- K. Top 5 Pizzas by Total Orders
SELECT TOP 5 pizza_name,
       COUNT(order_id) AS total_orders
FROM pizza_sales
GROUP BY pizza_name
ORDER BY total_orders DESC;

-- L. Bottom 5 Pizzas by Total Orders
SELECT TOP 5 pizza_name,
       COUNT(order_id) AS total_orders
FROM pizza_sales
GROUP BY pizza_name
ORDER BY total_orders ASC;
