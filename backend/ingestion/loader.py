from langchain_community.document_loaders import PyPDFLoader
import os


def load_pdfs(pdf_folder: str):
    """
    Load all PDF documents from a folder
    """

    documents = []

    for file in os.listdir(pdf_folder):

        if file.endswith(".pdf"):

            path = os.path.join(pdf_folder, file)

            loader = PyPDFLoader(path)

            docs = loader.load()

            documents.extend(docs)

    return documents