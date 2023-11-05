import React from "react";
import MediumText from "../universal/MediumText";
import { TextInput, Button } from "@mantine/core";

const SearchForm = () => {
  return (
    <div className="space-y-4">
      <MediumText>Company Search</MediumText>
      <TextInput size="md" radius="md" placeholder="Enter Stock" />
      <Button fullWidth size="sm" radius="md">Submit</Button>
    </div>
  );
};

export default SearchForm;
