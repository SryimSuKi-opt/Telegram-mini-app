# User Guide: E-commerce Telegram Mini App with KHQR/ABA Payway Integration

## Overview

This document provides comprehensive instructions for managing your e-commerce Telegram Mini App. The app allows customers to browse products, add items to cart, and complete purchases using KHQR/ABA Payway payment integration.

## Table of Contents

1. [System Requirements](#system-requirements)
2. [Accessing Your Mini App](#accessing-your-mini-app)
3. [Managing Products](#managing-products)
4. [Order Management](#order-management)
5. [Payment Configuration](#payment-configuration)
6. [Customization](#customization)
7. [Troubleshooting](#troubleshooting)

## System Requirements

- ABA Bank merchant account with PayWay access
- Firebase account (free tier is sufficient to start)
- Telegram account

## Accessing Your Mini App

### Initial Setup

1. **Access BotFather in Telegram**:
   - Open Telegram and search for "@BotFather"
   - Start a chat with BotFather

2. **Create a New Bot**:
   - Send the command `/newbot` to BotFather
   - Follow the prompts to name your bot and create a username
   - Save the API token provided by BotFather

3. **Create a Mini App**:
   - Send the command `/newapp` to BotFather
   - Select your bot from the list
   - Follow the prompts to name your Mini App
   - Save the direct link provided (format: `https://t.me/{botname}/{appname}`)

4. **Set Web App URL**:
   - After deployment, you'll receive a URL for your Mini App
   - Send the command `/setmenubutton` to BotFather
   - Select your bot
   - Enter the URL of your deployed Mini App
   - Set a title for the menu button (e.g., "Shop Now")

### Accessing the Admin Panel

1. Open your web browser and navigate to the admin panel URL provided during setup
2. Log in using your administrator credentials
3. You will see the dashboard with options for managing products, orders, and settings

## Managing Products

### Adding New Products

1. In the admin panel, navigate to "Products" → "Add New"
2. Fill in the product details:
   - Name: Product name
   - Price: Product price in USD
   - Description: Detailed product description
   - Category: Select or create a product category
   - Stock Status: Set availability status
3. Upload product images by clicking "Upload Image"
4. Click "Save" to add the product to your catalog

### Editing Products

1. In the admin panel, navigate to "Products" → "All Products"
2. Find the product you want to edit and click "Edit"
3. Update the product details as needed
4. Click "Save" to apply changes

### Removing Products

1. In the admin panel, navigate to "Products" → "All Products"
2. Find the product you want to remove
3. Click "Delete" and confirm the action
   - Alternatively, you can set the product as "Out of Stock" instead of deleting

### Managing Categories

1. In the admin panel, navigate to "Products" → "Categories"
2. To add a category, click "Add New" and enter the category name
3. To edit a category, click "Edit" next to the category name
4. To delete a category, click "Delete" and confirm the action

## Order Management

### Viewing Orders

1. In the admin panel, navigate to "Orders" → "All Orders"
2. You'll see a list of all orders with their status, date, and total amount
3. Click on an order to view its details

### Processing Orders

1. Open an order by clicking on it in the orders list
2. Review the order details, including customer information and items ordered
3. Update the order status using the dropdown menu:
   - Pending: Order received but not yet processed
   - Processing: Order is being prepared
   - Shipped: Order has been sent to the customer
   - Delivered: Order has been received by the customer
   - Cancelled: Order has been cancelled
4. Add notes to the order if needed
5. Click "Save" to update the order status

### Order Notifications

- You will receive Telegram notifications for new orders
- Customers will receive order status updates via Telegram

## Payment Configuration

### Setting Up ABA PayWay Integration

1. In the admin panel, navigate to "Settings" → "Payment"
2. Enter your ABA PayWay credentials:
   - Merchant ID: Your ABA PayWay merchant ID
   - Merchant API Key: Your API key from ABA PayWay
   - Currency: Select USD or KHR
3. Configure payment options:
   - Enable/disable KHQR payments
   - Set payment expiration time (in minutes)
4. Click "Save" to apply the settings

### Testing Payments

1. In the admin panel, navigate to "Settings" → "Payment" → "Test Mode"
2. Enable test mode to process test payments without actual transactions
3. Use the test payment feature to verify your integration
4. Disable test mode when ready to accept real payments

## Customization

### Appearance Settings

1. In the admin panel, navigate to "Settings" → "Appearance"
2. Customize your Mini App:
   - Upload your logo
   - Set primary and secondary colors
   - Customize button styles
   - Edit header and footer text
3. Preview changes in real-time
4. Click "Save" to apply the settings

### Content Management

1. In the admin panel, navigate to "Settings" → "Content"
2. Edit various text elements:
   - Welcome message
   - About us information
   - Contact details
   - Terms and conditions
   - Privacy policy
3. Click "Save" to apply the changes

## Troubleshooting

### Common Issues and Solutions

#### Payment Processing Issues

- **Issue**: Payments not being processed
  - **Solution**: Verify your ABA PayWay credentials in the admin panel
  - **Solution**: Ensure your merchant account is active

- **Issue**: QR code not displaying
  - **Solution**: Check your internet connection
  - **Solution**: Verify the ABA PayWay API status

#### Product Management Issues

- **Issue**: Products not appearing in the Mini App
  - **Solution**: Ensure products are marked as "In Stock"
  - **Solution**: Check that products are assigned to a category

- **Issue**: Images not displaying
  - **Solution**: Re-upload images in supported formats (JPG, PNG)
  - **Solution**: Ensure image sizes are under 5MB

#### Order Management Issues

- **Issue**: Missing order notifications
  - **Solution**: Check your Telegram notification settings
  - **Solution**: Verify webhook configuration in the admin panel

### Getting Support

If you encounter issues not covered in this guide:

1. Check the FAQ section in the admin panel
2. Contact support via the "Help" button in the admin panel
3. Email support at the address provided during setup

## Regular Maintenance

For optimal performance:

1. Regularly update product information and stock status
2. Process orders promptly
3. Monitor payment transaction reports
4. Back up your data periodically using the "Backup" feature in the admin panel

---

This guide covers the basic operations of your e-commerce Telegram Mini App. For advanced features and customizations, please refer to the detailed documentation provided during setup.
