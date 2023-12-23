#!/bin/bash
set -x

cd backend
node app.js
cd ../frontend
npm run start
