import praw

reddit = praw.Reddit(client_id="RhpaRfz1w6PUPuec825RrA", 
                     client_secret = "SIf5An9vzWPNHpDzxnvFX2W_xCfrOw",
                        user_agent = "hackutd-2023")

subreddit = reddit.subreddit("wallstreetbets")
print(subreddit.top(limit = 10))
for submission in subreddit.top(limit = 10):
    print(submission.title)