from flask import Flask, render_template, jsonify, request
from src.helper import download_hugging_face_embeddings, text_split
# from langchain.vectorstores import Pinecone
# from langchain_community.vectorstores import Pinecone
import pinecone
from langchain.prompts import PromptTemplate
# from langchain.llms import CTransformers
from langchain_community.llms import CTransformers
from langchain.chains import RetrievalQA
from dotenv import load_dotenv
from src.prompt import *
import os
from pinecone import Pinecone, ServerlessSpec
from langchain_pinecone import PineconeVectorStore
from langchain_community.vectorstores import Pinecone
from langchain_openai import OpenAIEmbeddings
# from langchain_community.document_loaders import PyPDFLoader
# from langchain_community.embeddings import HuggingFaceEmbeddings
# from langchain_community.document_loaders import DirectoryLoader

app = Flask(__name__)

load_dotenv()

# PINECONE_API_KEY = os.environ.get('PINECONE_API_KEY')
PINECONE_API_ENV = os.environ.get('PINECONE_API_ENV')

os.environ['PINECONE_API_KEY'] = "e1dff4c4-70af-4487-90a0-0d4f4fe2b355"


embeddings = download_hugging_face_embeddings()

#Initializing the Pinecone
# pinecone.init(api_key=PINECONE_API_KEY,
#               environment=PINECONE_API_ENV)

# pc = Pinecone(api_key="e1dff4c4-70af-4487-90a0-0d4f4fe2b355")
# index = pc.Index("medical-chatbot")


# Initialize Pinecone instance with your API key
# pc = Pinecone(api_key=os.environ.get("PINECONE_API_KEY"))

index_name="medical-chatbot"

#Loading the index
# docsearch=Pinecone.from_existing_index(index_name, embeddings)
# docsearch = PineconeVectorStore.from_texts(texts =  , embedding=embeddings, index_name=index_name)
# docsearch = pc.Index(index_name)

# Create PineconeVectorStore using existing index
docsearch = PineconeVectorStore.from_existing_index(
    index_name=index_name,
    embedding=embeddings
)


PROMPT=PromptTemplate(template=prompt_template, input_variables=["context", "question"])

chain_type_kwargs={"prompt": PROMPT}

llm=CTransformers(model="model/llama-2-7b-chat.ggmlv3.q4_0.bin",
                  model_type="llama",
                  config={'max_new_tokens':512,
                          'temperature':0.8})


qa=RetrievalQA.from_chain_type(
    llm=llm, 
    chain_type="stuff", 
    retriever=docsearch.as_retriever(search_kwargs={'k': 2}),
    return_source_documents=True, 
    chain_type_kwargs=chain_type_kwargs)



@app.route("/")
def index():
    return render_template('chat.html')



@app.route("/get", methods=["GET", "POST"])
def chat():
    msg = request.form["msg"]
    input = msg
    print(input)
    result=qa({"query": input})
    print("Response : ", result["result"])
    return str(result["result"])



if __name__ == '__main__':
    app.run(host="0.0.0.0", port= 8080, debug= True)


