import ast
from transformers import pipeline
sentiment_pipeline = pipeline(model = "ahmedrachid/FinancialBERT-Sentiment-Analysis")

def sentiment(news_text):
    parsed_sentiment = sentiment_pipeline(news_text.replace('\n', ' ').lower())
    return parsed_sentiment

counts = []

with open("ibm-reddit-fetches.txt", "r", encoding = "utf-8") as f:
    for line in f:
        start_date, data = line.split(',', maxsplit=1)
        data = ast.literal_eval(data)
        count = [0, 0, 0]
        for entry in data:
            if "subreddit" in entry.keys():
                print(entry['created_utc'])
                print(entry['title'])
                # print(entry['selftext'])
                sentiment_result = sentiment(entry['title'])
                print(sentiment_result)
                match sentiment_result[0]['label']:
                    case 'positive':
                        count[0] += 1
                    case 'neutral':
                        count[1] += 1
                    case 'negative':
                        count[2] += 1
                    case _:
                        print("Error")
                # sentiment_result = sentiment(entry['selftext'])
        counts.append(count)
for count in counts:
    print(count)
    