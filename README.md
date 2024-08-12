# Capstone Project for Computer Science and Software Engineering

## LondonNavigator - AI Chatbot

Front-end built with React Native and expo CLI for android and ios development
Backend built with Flask to connect to OpenAI, Langchain, Google Places, Pinecone and MongoDB endpoints.

Used Langchain Agents to handle maps finder, meeting scheduler and controlling the hallucinations with precise prompts.

### Getting Started
First clone the repo using 
```bash
git clone https://github.com/dhruwanga19/LondonNavigator.git
```
or use the `Open with GitHub Desktop` button, if you have it set up

#### Backend Installation
- cd to `backend`
```bash
cd LondonNavigator/backend
```
- Use python 3.12
- Make your virtual environment using `python -m venv .venv` and activate it using `source activate`
- Install the required packages using the following command:
```bash
pip install -r requirements.txt
```
- Create an `.env` file to setup the environment variables
    - These are the variables you need to setup:
      ```
      OPENAI_API_KEY = 'your openai api key'
      PINECONE_API_KEY = 'your pinecone api key'
      PINECONE_ENV = 'your pinecone environment name'
      PINECONE_INDEX_NAME = 'your pinecone index name'
      GOOGLE_PLACES_API_KEY = 'your google places api key'
      MONGODB_URI = 'your mongodb uri'
      ```
- Create a `docs` folder to store the documents for RAG from Pinecone Vector Store
    - Run the `ingest.py` script to load all documents in the `docs` folder to the Vector Store
      ```bash
      python ingest.py
      ```
    - This script does systematic chunking of documents and splits documents based on size of content inside the document to ensure efficient retrieval
    
    - Wait for the `Ingestion Complete` message in the console to successfully load all the documents for RAG (might take some time based on the document sizes)
- Set up your [Places API](https://developers.google.com/maps/documentation/places/web-service/get-api-key) key.
- Setup your MongoDB URI from [MONGODB](https://www.mongodb.com/docs/manual/reference/connection-string/). Make sure to get the Python compatible URI.

🎉You are all setup for the backend!

#### Frontend Installation
- cd to `frontend`
```bash
cd LondonNavigator/frontend
```
- Install the expo modules with the following command
  ```bash
  npx install-expo-modules@latest
  ```
- In case of errors during the expo modules installation refer to the Expo [docs](https://docs.expo.dev/bare/installing-expo-modules/)

🎉You are all setup for the frontend!

#### Running the app
Running the application requires you to start the backend server and the frontend server in two different terminals
- `Terminal 1` run the following command in the `backend/` directory with using
```
python app.py
```
- `Terminal 2` will run the following command in the `frontend/` directory
```
npx expo start
```
🎉 Once the expo app is loaded on the server, click `Get Started` to go into the chatscreen and start chatting with the bot.
