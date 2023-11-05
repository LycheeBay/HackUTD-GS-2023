import praw
import json
import requests
import datetime
from dateutil.relativedelta import relativedelta


reddit = praw.Reddit(client_id="RhpaRfz1w6PUPuec825RrA", 
                     client_secret = "SIf5An9vzWPNHpDzxnvFX2W_xCfrOw",
                        user_agent = "hackutd-2023")
"""
subreddit = reddit.subreddit("wallstreetbets")
print(subreddit.top(limit = 10))
for submission in subreddit.top(limit = 10):
    print(submission.title)
"""
"""
with open("ibm-reddit-2.json", "r") as f:
    cnt = 0
    data = json.load(f)
    for post in data['data']['children']:
        cnt += 1
        print(post['data']['title'])
    print(cnt)
"""

comments = [[] for _ in range(20)]

def generate_dates():
    date_list = []
    first_date = datetime.datetime.strptime("2018-12-31", "%Y-%m-%d")
    print(first_date)
    for i in range(20):
        next_date = first_date
        date_list.append(next_date)
        next_date = first_date + relativedelta(months=3)
        first_date = next_date
    return date_list

def get_comment_bucket(comments, date_list, comment):
    this_date = datetime.datetime.fromtimestamp(comment['created_utc'])
    if this_date < date_list[0]:
        return -1
    for i in range(len(date_list) - 1):
        if this_date >= date_list[i] and this_date < date_list[i + 1]:
            comments[i].append(comment)
            return i
    return -1

date_list = generate_dates()
print(date_list)

def comment_full(comments):
    for comment in comments:
        if len(comment) < 20:
            return False
    return True

print(get_comment_bucket(comments, date_list, {'created_utc': 1509880304}))
print(get_comment_bucket(comments, date_list, {'created_utc': 1572952304}))
print(get_comment_bucket(comments, date_list, {'created_utc': 1699161587}))

name = "ibm"
request = requests.get("https://www.reddit.com/search.json?q=" + name)
# print(request.json())
req = request.json()
print(req)

for _ in range(10):
    for post in req['data']['children']:
        submission = post['data']
        get_comment_bucket(comments, date_list, submission)

    request = requests.get("https://www.reddit.com/search.json?q=" + name + "&after=" + req['data']['after'])
    req = request.json()

with open(name + "-reddit-fetches.txt", "w") as f:
    for i in range(20):
        f.write(date_list[i])
        f.write(",")
        f.write(comments[i])