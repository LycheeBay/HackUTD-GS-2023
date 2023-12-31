import yfinance as yf
import datetime
import requests
from bs4 import BeautifulSoup
from transformers import pipeline
import pandas as pd
import json
from dateutil.relativedelta import *

class FinanceQuery():
    def __init__(self, stock):
        self.stock = stock
        self.ticker = yf.Ticker(stock)
        self.sentiment_pipeline = pipeline(model = "mrm8488/distilroberta-finetuned-financial-news-sentiment-analysis")
        # print(self.ticker.quarterly_income_stmt)
        # self.sentiment_pipeline = pipeline("sentiment-analysis")
        self.oex_list = ["AAPL", "ABBV", "ABT", "ACN", "ADBE", "AIG", "AMD", "AMGN", "AMT", "AMZN", "AVGO", "AXP", "BA", "BAC", "BK", "BKNG", "BLK", "BMY", "BRK.B", "C", "CAT", "CHTR", "CL", "CMCSA", "COF", "COP", "COST", "CRM", "CSCO", "CVS", "CVX", "DE", "DHR", "DIS", "DOW", "DUK", "EMR", "EXC", "F", "FDX", "GD", "GE", "GILD", "GM", "GOOG", "GOOGL", "GS", "HD", "HON", "IBM", "INTC", "JNJ", "JPM", "KHC", "KO", "LIN", "LLY", "LMT", "LOW", "MA", "MCD", "MDLZ", "MDT", "MET", "META", "MMM", "MO", "MRK", "MS", "MSFT", "NEE", "NFLX", "NKE", "NVDA", "ORCL", "PEP", "PFE", "PG", "PM", "PYPL", "QCOM", "RTX", "SBUX", "SCHW", "SO", "SPG", "T", "TGT", "TMO", "TMUS", "TSLA", "TXN", "UNH", "UNP", "UPS", "USB", "V", "VZ", "WFC", "WMT", "XOM"]
        # print(len(self.oex_list))
        self.oex_list = self.oex_list[:1]
        self.tickers = yf.Tickers(self.oex_list)


    def bal_sheet(self):
        return self.ticker.get_balance_sheet()
    
    def basic_data(self):
        # 
        df = self.ticker.get_balance_sheet()
        data_dict = {}
        data_dict["CurrentLiabilities"] = df.loc["CurrentLiabilities"]
        data_dict["CurrentAssets"] = df.loc["CurrentAssets"]
        # create a NetAssetPerShare column
        data_dict["NetAssetPerShare"] = df.loc["CurrentAssets"] / df.loc["ShareIssued"]
        return data_dict
        

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
        print(len(self.ticker.get_news()))
        news_text = []
        for i in self.ticker.get_news():
            print(i)
            url = i['link']
            news_text.append(i['title'])
        return news_text
        
    def sentiment(self, news_text = None):
        if news_text == None:
            news_text = self.news()
        for i in range(len(news_text)):
            news_text[i] = news_text[i].replace('\n', ' ').lower()
        parsed_sentiment = self.sentiment_pipeline(self.truncate_news(news_text))
        neg_cnt = 0; pos_cnt = 0
        for i in parsed_sentiment:
            print(i)
            if i['label'] == 'NEGATIVE':
                neg_cnt += 1
            else:
                pos_cnt += 1
        return {'positive': pos_cnt, 'negative': neg_cnt}
    
    # below data for ALL 100 stocks

    def all_balance_sheet_data(self):
        stocks_dict = {}
        for i in self.oex_list:
            stocks_dict[i] = self.tickers.tickers[i].quarterly_balance_sheet
        return stocks_dict
    
    def all_key_data(self):
        stocks_dict = {}
        for i in self.oex_list:
            stocks_dict[i] = {}
            stocks_dict[i]['balance'] = self.tickers.tickers[i].quarterly_balance_sheet
            stocks_dict[i]['cashflow'] = self.tickers.tickers[i].quarterly_cashflow
            stocks_dict[i]['income'] = self.tickers.tickers[i].quarterly_income_stmt
            stocks_dict[i]['history'] = self.tickers.tickers[i].history(period="max", end = datetime.datetime.today())
            stocks_dict[i]['history_metadata'] = self.tickers.tickers[i].history_metadata
        return stocks_dict
    
    def stock_key_data(self):
        stock_dict = {}
        stock_dict['balance'] = self.ticker.quarterly_balance_sheet
        stock_dict['cashflow'] = self.ticker.quarterly_cashflow
        stock_dict['income'] = self.ticker.quarterly_income_stmt
        stock_dict['history'] = self.ticker.history(period="max", end = datetime.datetime.today().strftime("%Y-%m-%d"))
        stock_dict['history_metadata'] = self.ticker.history_metadata
        return stock_dict
    
    def news_fetch(self, stock_name):
        APIKey = "333e352b98454c4fa2374b30403dc0f3"
        request = requests.get("https://newsapi.org/v2/everything?q="+stock_name.lower()+"&language=en&from=2023-10-05&sortBy=publishedAt&apiKey=" + APIKey)
        parsed_request = request.json()
        with open(stock_name.lower() + '.json', 'a') as outfile:
            json.dump(parsed_request, outfile)
        print(parsed_request)
    

    def headline_fetch(self, stock_name):
        APIKey = "333e352b98454c4fa2374b30403dc0f3"
        now_time = datetime.datetime.now()
        six_months_ago = now_time + relativedelta(months=-6)
        print(six_months_ago)
        request = requests.get("https://newsapi.org/v2/top-headlines?q="+stock_name.lower()+"&language=en&from=" + six_months_ago.strftime("%Y-%m-%d") + "&sortBy=publishedAt&apiKey=" + APIKey)
        parsed_request = request.json()
        with open(stock_name.lower() + '-headline.json', 'a') as outfile:
            json.dump(parsed_request, outfile)
        print(parsed_request)

    
stock = FinanceQuery("IBM")
# print(stock.all_key_data())
# msft.news()
# print(stock.stock_key_data())
# print(stock.news_fetch("IBM"))

stock.headline_fetch("IBM")

with open('ibm-headline.json', 'r') as json_file:
    file_read = json.loads(json_file.read())
    # print(file_read)
    for entry in file_read["articles"]:
        print(entry["content"])

"""
TreasurySharesNumber                              515000000.0     460000000.0     480000000.0     460000000.0
OrdinarySharesNumber                            10242000000.0   10180000000.0   10060000000.0    9960000000.0
ShareIssued                                     10757000000.0   10640000000.0   10540000000.0   10420000000.0
NetDebt                                         13262000000.0   12524000000.0             NaN             NaN
TotalDebt                                      140118000000.0  116395000000.0   84389000000.0   63205000000.0
TangibleBookValue                              125755000000.0  122874000000.0   78387000000.0   47306000000.0
InvestedCapital                                213193000000.0  186989000000.0  125220000000.0   85474000000.0
WorkingCapital                                  -8602000000.0   19314000000.0    6348000000.0    8522000000.0
NetTangibleAssets                              125755000000.0  122874000000.0   78387000000.0   47306000000.0
CapitalLeaseObligations                         72968000000.0   67651000000.0   52573000000.0   39791000000.0
CommonStockEquity                              146043000000.0  138245000000.0   93404000000.0   62060000000.0
TotalCapitalization                            213193000000.0  186989000000.0  125220000000.0   85474000000.0
TotalEquityGrossMinorityInterest               146043000000.0  138245000000.0   93404000000.0   62060000000.0
StockholdersEquity                             146043000000.0  138245000000.0   93404000000.0   62060000000.0
GainsLossesNotAffectingRetainedEarnings         -4487000000.0   -1376000000.0    -180000000.0    -986000000.0
TreasuryStock                                    7837000000.0    1837000000.0    1837000000.0    1837000000.0
RetainedEarnings                                83193000000.0   85915000000.0   52551000000.0   31220000000.0
AdditionalPaidInCapital                         75066000000.0   55538000000.0   42865000000.0   33658000000.0
CapitalStock                                      108000000.0       5000000.0       5000000.0       5000000.0
CommonStock                                       108000000.0       5000000.0       5000000.0       5000000.0
PreferredStock                                            0.0             NaN             0.0             0.0
TotalLiabilitiesNetMinorityInterest            316632000000.0  282304000000.0  227791000000.0  163188000000.0
TotalNonCurrentLiabilitiesNetMinorityInterest  161239000000.0  140038000000.0  101406000000.0   75376000000.0
OtherNonCurrentLiabilities                      21121000000.0   23643000000.0   17017000000.0   12171000000.0
LongTermDebtAndCapitalLeaseObligation          140118000000.0  116395000000.0   84389000000.0   63205000000.0
LongTermCapitalLeaseObligation                  72968000000.0   67651000000.0   52573000000.0   39791000000.0
LongTermDebt                                    67150000000.0   48744000000.0   31816000000.0   23414000000.0
CurrentLiabilities                             155393000000.0  142266000000.0  126385000000.0   87812000000.0
CurrentDeferredLiabilities                      13227000000.0   11827000000.0    9708000000.0    8190000000.0
CurrentDeferredRevenue                          13227000000.0   11827000000.0    9708000000.0    8190000000.0
PayablesAndAccruedExpenses                     142166000000.0  130439000000.0  116677000000.0   79622000000.0
CurrentAccruedExpenses                          62566000000.0   51775000000.0   44138000000.0   32439000000.0
Payables                                        79600000000.0   78664000000.0   72539000000.0   47183000000.0
AccountsPayable                                 79600000000.0   78664000000.0   72539000000.0   47183000000.0
TotalAssets                                    462675000000.0  420549000000.0  321195000000.0  225248000000.0
TotalNonCurrentAssets                          315884000000.0  258969000000.0  188462000000.0  128914000000.0
OtherNonCurrentAssets                           42758000000.0   27235000000.0   22778000000.0   16314000000.0
GoodwillAndOtherIntangibleAssets                20288000000.0   15371000000.0   15017000000.0   14754000000.0
OtherIntangibleAssets                                     NaN    5107000000.0    4981000000.0    4049000000.0
Goodwill                                        20288000000.0   15371000000.0   15017000000.0   14754000000.0
NetPPE                                         252838000000.0  216363000000.0  150667000000.0   97846000000.0
AccumulatedDepreciation                        -97015000000.0  -78519000000.0  -60434000000.0  -46975000000.0
GrossPPE                                       252838000000.0  216363000000.0  150667000000.0   97846000000.0
ConstructionInProgress                          30020000000.0   24895000000.0   15228000000.0    6036000000.0
OtherProperties                                252838000000.0  216363000000.0  150667000000.0   97846000000.0
MachineryFurnitureEquipment                               NaN  128683000000.0   97224000000.0   71310000000.0
LandAndImprovements                             91650000000.0   81104000000.0   57324000000.0   39223000000.0
Properties                                                0.0             0.0             0.0             0.0
CurrentAssets                                  146791000000.0  161580000000.0  132733000000.0   96334000000.0
Inventory                                       34405000000.0   32640000000.0   23795000000.0   20497000000.0
FinishedGoods                                             NaN   32640000000.0   23795000000.0   20497000000.0
Receivables                                     42360000000.0   32891000000.0   24542000000.0   20816000000.0
AccountsReceivable                              42360000000.0   32891000000.0   24542000000.0   20816000000.0
AllowanceForDoubtfulAccountsReceivable          -1400000000.0   -1000000000.0   -1000000000.0    -718000000.0
GrossAccountsReceivable                         43760000000.0   33891000000.0   25542000000.0   21534000000.0
CashCashEquivalentsAndShortTermInvestments      70026000000.0   96049000000.0   84396000000.0   55021000000.0
OtherShortTermInvestments                       16138000000.0   59829000000.0   42274000000.0   18929000000.0
CashAndCashEquivalents                          53888000000.0   36220000000.0   42122000000.0   36092000000.0
"""