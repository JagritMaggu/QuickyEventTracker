a) Setup instructions: 

One is required to =>
In one terminal:

git clone 
https://github.com/JagritMaggu/QuickyEventTracker.git
cd QuickyEventTracker
cd backend
npm install
npm start or npm run dev(for nodemon)

In second terminal:

cd frontend
cd quickly
npm install
npm start

Notes: MongoDB must be running (Atlas)
Use postman to test backend APIs if needed.

1) create a new .env file in the backend
2) copy the keys from .env.example
3) input values accordingly

b) Tech stack choice & reasoning:

I am a Fullstack developer and hold the experience of nearly 10 months using MERN, I recently built a personal product using MERN, socket-io, motion framer, tailwind-css, jsonwebtoken, lucide-react and react-hot-toast. 
I am confident and proficient in this Stack more than any other that's the reason it is my first preference.

c) Assumptions:

1) Only a registered user is authorised to access the main portal(Homepage) or any other route in the website. So, kindly first create an ID using signup form then enter the website.
2) As mentioned before every user will provide their own jwt_secret_key, Node_env, Mongo_uri, Port number in .env. (Mentioned as keys in .env.example).
3) Backend and frontend assume Mongodb and Node.js are installed and running locally.
