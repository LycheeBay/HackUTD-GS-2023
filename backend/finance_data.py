import yfinance as yf
import datetime
import requests
from bs4 import BeautifulSoup
from transformers import pipeline

class FinanceQuery():
    def __init__(self, stock):
        self.stock = stock
        self.ticker = yf.Ticker(stock)
        self.sentiment_pipeline = pipeline("sentiment-analysis")

    def asset_liability(self):
        return self.ticker.balance_sheet

    def truncate_news(self, news_text, max_len = 512):
        truncated_news = []
        for i in news_text:
            if len(i) > max_len:
                truncated_news.append(i[:max_len])
            else:
                truncated_news.append(i)
        return truncated_news
    
    def news(self):
        # print(self.ticker.news)
        news_text = []
        for i in self.ticker.news:
            # print(i)
            url = i['link']
            request = requests.get(url)
            soup = BeautifulSoup(request.text, 'html.parser')
            soup_find = soup.find('div', {'class': 'caas-body'})
            if soup_find is not None:
                # print(soup_find.text)
                news_text.append(soup_find.text)
            else:
                # print("-------------------------- WE SCREWED UP --------------------------")
                news_text.append(i['title'])
        return news_text
        
        
    def sentiment(self, news_text = None):
        if news_text == None:
            news_text = self.news()
        parsed_sentiment = self.sentiment_pipeline(self.truncate_news(news_text))
        neg_cnt = 0; pos_cnt = 0
        for i in parsed_sentiment:
            if i['label'] == 'NEGATIVE':
                neg_cnt += 1
            else:
                pos_cnt += 1
        return {'positive': pos_cnt, 'negative': neg_cnt}
    
    def hist(self, start_date = "2019-01-01"):
        end_date = datetime.now().strftime('%Y-%m-%d')
        return self.ticker.history(start=start_date, end=end_date)
    
stock = FinanceQuery("AMZN")
# msft.news()
print(stock.sentiment())