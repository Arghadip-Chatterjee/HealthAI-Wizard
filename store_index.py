from src.helper import load_pdf, text_split, download_hugging_face_embeddings
# from langchain.vectorstores import Pinecone as pc
import pinecone
from dotenv import load_dotenv
import os
#  import os
from pinecone import Pinecone, ServerlessSpec
# from langchain_community.document_loaders import PyPDFLoader
# from langchain_community.embeddings import HuggingFaceEmbeddings
# from langchain_community.document_loaders import DirectoryLoader

load_dotenv()

PINECONE_API_KEY = os.environ.get('PINECONE_API_KEY')
PINECONE_API_ENV = os.environ.get('PINECONE_API_ENV')

# print(PINECONE_API_KEY)
# print(PINECONE_API_ENV)

extracted_data = load_pdf("data/")
text_chunks = text_split(extracted_data)
embeddings = download_hugging_face_embeddings()


#Initializing the Pinecone
# pinecone.init(api_key=PINECONE_API_KEY,
#               environment=PINECONE_API_ENV)

# pc = Pinecone(api_key=PINECONE_API_KEY, environment = PINECONE_API_ENV)
# print(pc.list_indexes())

pc = Pinecone(api_key="e1dff4c4-70af-4487-90a0-0d4f4fe2b355")
index = pc.Index("medical-chatbot")

# index_name="quickstart"
# index = pc.Index(index_name)  
# if index_name not in pc.list_indexes().names():
#   # Do something, such as create the index
#   pc.create_index(
#     name=index_name,
#     dimension=1536,
#     metric='cosine',
#     spec=ServerlessSpec(
#       cloud="aws",
#       region="us-east-1"
#     )
#   )

# pc.describe_index("serverless-index")

for i, t in zip(range(len(text_chunks)), text_chunks):
   query_result = embeddings.embed_query(t.page_content)
   index.upsert(
   vectors=[
        {
            "id": str(i),  # Convert i to a string
            "values": query_result, 
            "metadata": {"text":str(text_chunks[i].page_content)} # meta data as dic
        }
    ],
    namespace="real" 
)

index.describe_index_stats() 

#Creating Embeddings for Each of The Text Chunks & storing
# docsearch=Pinecone.from_texts([t.page_content for t in text_chunks], embeddings, index_name=index_name)
