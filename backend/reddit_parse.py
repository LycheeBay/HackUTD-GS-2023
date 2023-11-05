import ast
with open("ibm-reddit-fetches.txt", "r", encoding = "utf-8") as f:
    for line in f:
        start_date, data = line.split(',', maxsplit=1)
        data = ast.literal_eval(data)
        for entry in data:
            if "subreddit" in entry.keys():
                print(entry['created_utc'])
                print(entry['title'])
                print(entry['selftext'])