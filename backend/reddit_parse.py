import ast
from transformers import pipeline
sentiment_pipeline = pipeline("sentiment-analysis")

def sentiment(news_text):
    parsed_sentiment = sentiment_pipeline(news_text.replace('\n', ' ').lower())
    return parsed_sentiment

with open("ibm-reddit-fetches.txt", "r", encoding = "utf-8") as f:
    for line in f:
        start_date, data = line.split(',', maxsplit=1)
        data = ast.literal_eval(data)
        for entry in data:
            if "subreddit" in entry.keys():
                print(entry['created_utc'])
                # print(entry['title'])
                # print(entry['selftext'])
                print(sentiment(entry['title']))
    