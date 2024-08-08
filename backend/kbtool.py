# from langchain.vectorstores import PineconeStore
from langchain_pinecone import PineconeVectorStore
# from langchain.llms import OpenAI
# from langchain.chains import VectorDBQAChain
from langchain.chains import RetrievalQA
# from langchain.agents import initialize_agent_executor_with_options
# from langchain.tools import ChainTool
import os
from dotenv import load_dotenv
from langchain_openai import OpenAIEmbeddings
from pinecone import Pinecone as PineconeClient
from langchain.chat_models import ChatOpenAI
from langchain.tools import tool
from langchain.prompts import PromptTemplate
from flask import jsonify


@tool
def knowledge_base(query: str):
    "Use this tool when answering queries specific to London, Ontario/ON."
    load_dotenv()
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
    PINECONE_API_KEY = os.getenv('PINECONE_API_KEY')
    PINECONE_INDEX_NAME = os.getenv('PINECONE_INDEX_NAME')

    client = PineconeClient(api_key=PINECONE_API_KEY)   
    embeddings = OpenAIEmbeddings(openai_api_key=OPENAI_API_KEY)
    vector_db = PineconeVectorStore.from_existing_index(PINECONE_INDEX_NAME, embeddings)
    llm = ChatOpenAI(openai_api_key=OPENAI_API_KEY)
    doc_retriever = vector_db.as_retriever(search_kwargs={'k': 3})
    
    prompt_template = """Use the following pieces of context (delimited by <ctx></ctx>) to answer the question at the end.
    If you don't know the answer, just say that you don't know, don't try to make up an answer.
    If the question is not related to the context, politely respond that you are tuned to only answer questions that are related to the context.
    ------
    <ctx>
    {context}
    </ctx>
    ------
    Question: {question}
    Answer with context:
    """
    PROMPT = PromptTemplate(
        template=prompt_template, input_variables=["context", "question"]
    )

    chain_kwargs = {"verbose": True, 
                    "prompt": PROMPT
                    }
    chain = RetrievalQA.from_chain_type(llm=llm,
                                  chain_type="stuff",
                                  retriever=doc_retriever,
                                  verbose=True,
                                  return_source_documents=True,
                                  chain_type_kwargs=chain_kwargs)
    
    result = chain({"query": query})
    source_docs = []
    for doc in result["source_documents"]:
        content = doc.page_content
        page_number = doc.metadata['page']
        source = doc.metadata['source']
        source_docs.append({
            'content': content,
            'doc' : f"Page {page_number}, Source: {source}"
        })
    
    return result["result"]

