import Container from "@/components/layout/Container";
import InfoContainer from "@/components/layout/InfoContainer";
import SearchContainer from "@/components/layout/SearchContainer";
import { Button, TextInput } from "@mantine/core";
import MediumText from "@/components/universal/MediumText";
import SwapView from "@/components/display/SwapView";
import HeaderInfo from "@/components/display/HeaderInfo";
import SampleStocks from "@/components/display/SampleStocks";
import NewsOutlook from "@/components/data/NewsOutlook";
import SocialOutlook from "@/components/data/SocialOutlook";
import { useForm } from "@mantine/form";
import { useState } from "react";

export default function Home() {
  const [success, setSuccess] = useState(false);

  const [newsResult, setNewsResult] = useState(1);
  const [socialResult, setSocialResult] = useState(2);
  // Placeholder first
  const [data, setData] = useState({
    "1": [222, 248, 210, 263],
    "2": [1, 12, 3, 4],
    "3": [1, 2, 3, 14],
    "4": [1, 22, 23, 4],
    "5": [11, 2, 3, 4],
  });

  const form = useForm({
    initialValues: {
      ticker: "",
    },
  });

  // function handleSumbit(event: any) {
  //   event.preventDefault(); // Prevent the default form submission behavior
  //   // Changes to real name
  //   setSuccess(true);
  //   // Sets real data
  //   setData({
  //     "1": [22, 2, 2423, 4],
  //     "2": [1, 12, 3, 4],
  //     "3": [21, 2, 3, 14],
  //     "4": [39, 22, 23, 4],
  //     "5": [11, 2, 3, 4],
  //   });
  //   // Sets real news results
  //   setNewsResult(3)
  //   setSocialResult(1)
  // }
  async function handleSumbit(event: any) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Make a GET request to the API URL
  await fetch('https://api.example.com/data') // Replace with your API endpoint
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Assuming the API returns JSON data
    })
    .then(data => {
      // Handle the API data
      setSuccess(true);

      // Assuming the API response data has a structure similar to your example data
      setData({
        "1": data[0],
        "2": data[1],
        "3": data[2],
        "4": data[3],
        "5": data[4],
      });

      // You may also need to fetch and set the news and social results from the API
      // Replace 'newsResult' and 'socialResult' with the actual API data properties
      setNewsResult(data.newsResult);
      setSocialResult(data.socialResult);
    })
    .catch(error => {
      console.error('Error fetching data from the API:', error);
    });
}


  return (
    <Container>
      <form className="space-y-4" onSubmit={handleSumbit}>
        <SampleStocks />
        <HeaderInfo
          company={success ? "International Business Machines" : ""}
          ticker={success ? "IBM" : ""}
        />
        <div className="grid grid-cols-7 gap-6 h-96">
          <div className="col-span-5 space-y-6">
            <InfoContainer>
              <SwapView data={data} />
            </InfoContainer>
          </div>
          <div className="col-span-2 space-y-4">
            <SearchContainer>
              <div className="space-y-6">
                <MediumText>Company Search</MediumText>
                <TextInput
                  size="md"
                  radius="md"
                  placeholder="Ex. (AMZM, AAPL, META, ...)"
                  {...form.getInputProps("ticker")}
                />
                <Button
                  color="dark"
                  fullWidth
                  size="sm"
                  radius="md"
                  type="submit"
                >
                  Submit
                </Button>
              </div>
            </SearchContainer>
            <NewsOutlook result={newsResult} />
            <SocialOutlook result={socialResult} />
          </div>
        </div>
      </form>
    </Container>
  );
}
