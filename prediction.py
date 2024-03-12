import requests
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
import string
import nltk
import pandas as pd
import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
import csv
import re

def prediction(text_data, mnb_model, tfidf_vectorizer):
    x = tfidf_vectorizer.transform(text_data).toarray()
    
    # Make predictions using the provided Multinomial Naive Bayes model
    y_pred = mnb_model.predict(x)
    
    return y_pred


def preprocessingText(text):
    
    if isinstance(text, str):  # Check if text is a string
        text = re.sub(r'https?:\/\/.*[\r\n]*', '', text)
        text = re.sub(r'#', '', text)
        text = re.sub(r'\r', '', text)
        text = re.sub(r'\n', '', text)
        text = re.sub(r'Subject:', '', text)
        text = re.sub(r'Email:', '', text)
        text = re.sub(r':', '', text)
        text = re.sub(r'nbsb', '', text)
        text = text.lower()
        
        text = word_tokenize(text)
        porter_stemmer = PorterStemmer()
        
        list1 = []
        for word in text:
            if word.isalnum():
                list1.append(word)
        words = []
        # nltk.download('stopwords')
        # print('predicting')
        stopword_eng = stopwords.words('english')
        for word in list1:
            if word not in stopword_eng and word not in string.punctuation:
                words.append(word)
        
        if words:
            words = [porter_stemmer.stem(token) for token in words]
            return " ".join(words)
        else:
            return ""  # Return an empty string if no valid tokens
    else:
        return ""  # Return an empty string if text is not a string


with open('dst.pkl', 'rb') as f:
    model = pickle.load(f)

with open('tfidfDT.pkl','rb')as file:
    tfidf=pickle.load(file)

data = pd.read_csv('./NewEmails.csv')
data.dropna(inplace = True)
data["preprocessedData"] = data['text'].apply(preprocessingText)
data["predictions"] = prediction(data['preprocessedData'], model, tfidf)

columns = ["text", "predictions"]

data.to_csv('dstPrediction.csv', columns=columns, index=False)

print('predicted!')