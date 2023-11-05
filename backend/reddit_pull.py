import praw
import json
import requests

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

def comment_full(comments):
    for comment in comments:
        if len(comment) < 20:
            return False
    return True

name = "ibm"
request = requests.get("https://www.reddit.com/search.json?q=" + name)
# print(request.json())
req = request.json()

while not comment_full(comments) and not req['after'] == None:
    for post in req['data']['children']:
        submission = post['data']
        
        

    request = requests.get("https://www.reddit.com/search.json?q=" + name + "&after=" + req['after'])
    req = request.json()