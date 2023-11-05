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

  const [newsResult, setNewsResult] = useState(3);
  const [socialResult, setSocialResult] = useState(1);
  // Placeholder first
  const [data, setData] = useState({
    "1": [-7.903069, -3.0, -2.1, 5.0],
    "2": [1.796239, 6.820679, 10.0, 13.0],
    "3": [927000000, 1350000000, 1550000000, 1704000000.0000017],
    "4": [1965000000, 2450000000, 2700000000, 2846999999.9999895],
  });

  const form = useForm({
    initialValues: {
      ticker: "",
    },
  });

  function handleSumbit(event: any) {
    event.preventDefault(); // Prevent the default form submission behavior
    // Changes to real name
    setSuccess(true);
    // Sets real data
    setData({
      "1": [-7.903069, 4.901030, 0.000000, 16.954494869901737],
      "2": [1.796239, 12.820679, 13.516811, 13.478603453660128],
      "3": [927000000, 1583000000, 1704000000, 1704000000.0000017],
      "4": [1965000000, 2982000000, 2847000000, 2846999999.9999895]
    })

    // Sets real news results
    setNewsResult(3)
    setSocialResult(3)
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
