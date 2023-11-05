import requests
import datetime
from dateutil.relativedelta import relativedelta

# Replace with your Google Custom Search API key
api_key = "AIzaSyD9upmMN4fB1Cq7D4PJddrxP9K0BNUN6PI"

# Replace with your Custom Search Engine ID
cx = "02d000cb232494dc5"

# Define the search parameters
keyword = "IBM and (finance or stock)"
start_date = datetime.datetime.strptime("2022-04-28", "%Y-%m-%d")
num_results = 10

for i in range(20):
    end_date = start_date + relativedelta(months = 1)
    # Define the API endpoint
    url = f"https://www.googleapis.com/customsearch/v1?key={api_key}&cx={cx}"

    start = start_date.strftime("%Y/%m/%d")
    end = end_date.strftime("%Y/%m/%d")

    # Define the query string
    query = f"{keyword} after:{start} before:{end}"

    # Define the number of results per page (adjust as needed)
    results_per_page = 10

    # Initialize variables for pagination
    start_index = 1
    total_results = []

    # Make requests to fetch the results
    while len(total_results) < num_results:
        response = requests.get(url, params={"q": query, "start": start_index})
        data = response.json()
        print(data)

        if "items" in data:
            total_results.extend(data["items"])

        # Check if there are more results to fetch
        if "queries" in data and "nextPage" in data["queries"]:
            next_start_index = int(data["queries"]["nextPage"][0]["startIndex"])
            if next_start_index == start_index:
                break  # No more results to fetch
            start_index = next_start_index
        else:
            break  # No more results to fetch

    # Extract the top 10 results
    top_results = total_results[:num_results]

    with open("ibm-google-link.txt", "a", encoding="utf-8") as f:
        f.write(start_date.strftime("%Y-%m-%d"))
        f.write(",")
        f.write(end_date.strftime("%Y-%m-%d"))
        f.write(",")
        # Print the titles and links of the top results
        ans = []
        for i, result in enumerate(top_results, start=1):
            ans.append([result["title"], result["link"]])
        f.write(str(ans))
        f.write('\n')

    start_date = end_date

