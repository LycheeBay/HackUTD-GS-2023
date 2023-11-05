import praw
import json

reddit = praw.Reddit(client_id="RhpaRfz1w6PUPuec825RrA", 
                     client_secret = "SIf5An9vzWPNHpDzxnvFX2W_xCfrOw",
                        user_agent = "hackutd-2023")
"""
subreddit = reddit.subreddit("wallstreetbets")
print(subreddit.top(limit = 10))
for submission in subreddit.top(limit = 10):
    print(submission.title)
"""

with open("ibm-reddit-2.json", "r") as f:
    cnt = 0
    data = json.load(f)
    for post in data['data']['children']:
        cnt += 1
        print(post['data']['title'])
    print(cnt)