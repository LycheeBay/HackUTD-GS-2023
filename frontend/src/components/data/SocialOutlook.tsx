import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import MediumText from "../universal/MediumText";

type SocialOutlookTypes = {
  result: number;
};

const SocialOutlook = ({ result }: SocialOutlookTypes) => {
  return (
    <div className="col-span-1 p-4 rounded-md shadow-lg bg-white">
      <div className="space-y-2">
        <div className="flex items-center gap-4">
          <Icon icon="fluent:people-16-regular" width={24} height={24} />
          <MediumText>
            Social Outlook
          </MediumText>
        </div>
        {result === 1 &&
          (
            <div className="font-bold text-md text-green-500">
              + Positive 
            </div>
          )}

        {result === 2 &&
          (
            <div className="font-bold text-md text-red-500">
              - Negative
            </div>
          )}

        {result === 3 &&
          (
            <div className="font-bold text-md text-yellow-500">
              +/- Neutral
            </div>
          )}
      </div>
    </div>
  );
};

export default SocialOutlook;
