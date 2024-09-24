#!/bin/bash

cd  /Users/camilleangshujie/Documents/BILLIONAIRE/DEAKINU/TrimesterTwo/SIT753/vehicleChecker

# Install dependencies
npm install

# Start the application 
pm2 start src/server.js --name vehicleChecker 