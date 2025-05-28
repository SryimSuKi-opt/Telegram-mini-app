# Installation and Deployment Guide

This document provides step-by-step instructions for deploying your Telegram Mini App e-commerce solution with KHQR/ABA Payway integration.

## Prerequisites

- Node.js (v16 or higher)
- Firebase account
- ABA Bank merchant account with PayWay access
- Telegram account

## Step 1: Set Up Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" and follow the setup wizard
3. Once created, add a web app to your project:
   - Click the web icon (</>) on the project overview page
   - Register your app with a nickname
   - Copy the Firebase configuration object for later use

## Step 2: Configure Firebase Services

1. Enable Firestore Database:
   - In Firebase Console, go to "Firestore Database"
   - Click "Create database"
   - Start in production mode
   - Choose a location close to your users

2. Set up Authentication:
   - Go to "Authentication" in Firebase Console
   - Click "Get started"
   - Enable Email/Password authentication method

3. Set up Firebase Storage:
   - Go to "Storage" in Firebase Console
   - Click "Get started"
   - Follow the setup wizard

## Step 3: Create Telegram Bot and Mini App

1. Open Telegram and search for "@BotFather"
2. Start a chat and send the command `/newbot`
3. Follow the prompts to create your bot
4. After creation, send the command `/newapp`
5. Select your bot and follow the prompts to create a Mini App
6. Save the bot token and Mini App link for later use

## Step 4: Configure the Application

1. Extract the provided ZIP file to your local machine
2. Open the project folder in your preferred code editor
3. Navigate to `src/services/firebase.js`
4. Replace the placeholder Firebase configuration with your actual configuration:
   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_PROJECT_ID.appspot.com",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
   };
   ```

5. Navigate to `src/services/paymentService.js`
6. Update the ABA PayWay configuration with your merchant details:
   ```javascript
   const ABA_PAYWAY_CONFIG = {
     merchantId: "YOUR_MERCHANT_ID",
     apiKey: "YOUR_API_KEY",
     baseUrl: "https://checkout.payway.com.kh/api/payment-gateway/v1"
   };
   ```

## Step 5: Install Dependencies and Build

1. Open a terminal in the project directory
2. Run the following commands:
   ```bash
   npm install
   npm run build
   ```
3. This will create a `dist` folder with the built application

## Step 6: Deploy to Firebase Hosting

1. Install Firebase CLI if you haven't already:
   ```bash
   npm install -g firebase-tools
   ```

2. Log in to Firebase:
   ```bash
   firebase login
   ```

3. Initialize Firebase in your project:
   ```bash
   firebase init
   ```
   - Select "Hosting"
   - Select your Firebase project
   - Specify "dist" as your public directory
   - Configure as a single-page app: Yes
   - Set up automatic builds and deploys: No

4. Deploy your application:
   ```bash
   firebase deploy
   ```

5. Note the hosting URL provided after successful deployment

## Step 7: Connect Mini App to Telegram Bot

1. Go back to Telegram and chat with BotFather
2. Send the command `/setmenubutton`
3. Select your bot
4. Enter the Firebase hosting URL from Step 6
5. Set a title for the menu button (e.g., "Shop Now")

## Step 8: Set Up Admin Panel

1. Navigate to your Firebase hosting URL + "/admin" in your browser
2. Create an admin account using the registration form
3. Log in with your new admin credentials
4. Configure your store settings:
   - Store information
   - Payment settings
   - Shipping options
   - Notification preferences

## Step 9: Add Products

1. In the admin panel, go to "Products" → "Add New"
2. Add your products with:
   - Name, description, price
   - Images (upload from your computer)
   - Categories
   - Stock status

## Step 10: Test Your Mini App

1. Open Telegram and go to your bot
2. Click the menu button to launch your Mini App
3. Test the full customer journey:
   - Browse products
   - Add items to cart
   - Complete checkout
   - Process a test payment

## Step 11: Go Live

1. In the admin panel, go to "Settings" → "Payment"
2. Switch from test mode to live mode
3. Verify all settings are correct
4. Your e-commerce Telegram Mini App is now ready for customers!

## Maintenance and Updates

To update your application in the future:

1. Make changes to the code
2. Run `npm run build` to create a new build
3. Run `firebase deploy` to deploy the changes

For database or security rule changes:
```bash
firebase deploy --only firestore,storage
```

## Troubleshooting

If you encounter issues during deployment:

1. Check Firebase deployment logs:
   ```bash
   firebase deploy --debug
   ```

2. Verify your Firebase configuration matches your project

3. Ensure your ABA PayWay credentials are correct

4. Check that your Telegram bot and Mini App are properly configured

For additional support, refer to the user guide or contact our support team.
