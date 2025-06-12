import pickle
import numpy as np
import re
import pandas as pd

import joblib
# from keybert import KeyBERT
# kw_model = KeyBERT()
# vectorizer = joblib.load('tfidf_vectorizer.pkl')
# model = joblib.load('best_sentiment_model.pkl')
vectorizer = joblib.load('/models/tfidf_vectorizer.pkl')
model = joblib.load('/models/best_sentiment_model.pkl')

# Stopwords (same as original)
# Define a more comprehensive set of stopwords
english_stopwords = {
    'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', 'your', 
    'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', 
    'her', 'hers', 'herself', 'it', 'its', 'itself', 'they', 'them', 'their', 
    'theirs', 'themselves', 'what', 'which', 'who', 'whom', 'this', 'that', 
    'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 
    'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an', 
    'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 
    'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through', 
    'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 
    'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then', 
    'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 
    'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 
    'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 
    'will', 'just', 'don', "don't", 'should', 'now', 'd', 'll', 'm', 'o', 're', 
    've', 'y', 'ain', 'aren', "aren't", 'couldn', "couldn't", 'didn', "didn't", 
    'doesn', "doesn't", 'hadn', "hadn't", 'hasn', "hasn't", 'haven', "haven't", 
    'isn', "isn't", 'ma', 'mightn', "mightn't", 'mustn', "mustn't", 'needn', 
    "needn't", 'shan', "shan't", 'shouldn', "shouldn't", 'wasn', "wasn't", 
    'weren', "weren't", 'won', "won't", 'wouldn', "wouldn't"
}

# Words that shouldn't be removed as they're important for sentiment
sentiment_words = {
    'not', 'no', 'never', 'none', 'nobody', 'nothing', 'nowhere', 'neither', 
    'nor', 'hardly', 'scarcely', 'barely', 'but', 'however', 'although', 
    'though', 'despite', 'except', 'unless', 'until', 'without'
}


for word in sentiment_words:
    english_stopwords.discard(word)

# Preprocessing function (same as original)
def preprocess_text(text):
    if pd.isna(text) or text is None:
        return ""
    
    text = str(text).lower()
    text = re.sub(r"[^a-zA-Z0-9!?.,'\s]", '', text)
    
    contractions = {
        "won't": "will not", "can't": "can not", "n't": " not", "'re": " are",
        "'s": " is", "'d": " would", "'ll": " will", "'t": " not", "'ve": " have",
        "'m": " am"
    }
    for contraction, expansion in contractions.items():
        text = text.replace(contraction, expansion)
    
    words = re.findall(r"\b\w+(?:'\w+)?\b", text)
    filtered_words = [word for word in words if word not in english_stopwords]
    
    result = []
    negate = False
    negators = {'not', 'no', 'never', 'none', 'nobody', 'nothing', 'nowhere', 
                'neither', 'nor', 'hardly', 'scarcely', 'barely'}

    for word in filtered_words:
        if word in negators:
            negate = True
            result.append(word)
        elif negate:
            result.append('NOT_' + word)
            negate = False
        else:
            result.append(word)
    
    return ' '.join(result)

# SentimentAnalyzer class
class SentimentAnalyzer:
    def __init__(self, model, vectorizer):
        self.model = model
        self.vectorizer = vectorizer

    def predict_sentiment(self, text):
        processed = preprocess_text(text)
        features = self.vectorizer.transform([processed])
        prediction = self.model.predict(features)[0]

        confidence = "N/A"
        if hasattr(self.model, 'predict_proba'):
            probabilities = self.model.predict_proba(features)[0]
            confidence = max(probabilities) * 100
        elif hasattr(self.model, 'decision_function'):
            decision_scores = self.model.decision_function(features)
            confidence = (1 / (1 + np.exp(-abs(decision_scores)))) * 100
            if isinstance(confidence, np.ndarray):
                confidence = float(confidence[0])

        rating = 1 if prediction == 'Negative' else 3 if prediction == 'Neutral' else 5

        return prediction, rating, confidence

# Use it
# analyzer = SentimentAnalyzer(model, vectorizer)
# text = input("Enter a review: ")
# sentiment, rating, confidence = analyzer.predict_sentiment(text)

# print(f"\nSentiment: {sentiment}, Rating: {rating}/5, Confidence: {confidence:.2f}%")

# def extract_keywords_keybert(text, top_n=5):
#     processed = preprocess_text(text)
#     keywords = kw_model.extract_keywords(
#         processed,
#         keyphrase_ngram_range=(1, 2),  # Extract unigrams & bigrams
#         stop_words='english',
#         use_maxsum=True,
#         nr_candidates=20,
#         top_n=top_n
#     )
#     return [kw[0] for kw in keywords]


# Use it
import sys

if len(sys.argv) < 2:
    print("No input text provided.")
    sys.exit(1)

text = sys.argv[1]
analyzer = SentimentAnalyzer(model, vectorizer)
sentiment, rating, confidence = analyzer.predict_sentiment(text)
# keywords = extract_keywords_keybert(text)

print(f"Sentiment: {sentiment}")
print(f"Confidence level: {confidence:.2f}%")
print(f"Rating: {rating}")
# print(f"Key insights: {', '.join(keywords)}")