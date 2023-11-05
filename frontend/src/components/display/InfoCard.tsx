import React, { ReactNode, useState } from "react";
import MediumText from "../universal/MediumText";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Modal } from "@mantine/core";
import LineGraph from "./LineGraph";

type InfoCardTypes = {
  title: string;
  icon: string;
  children: ReactNode;
};

const InfoCard = ({ children, title, icon }: InfoCardTypes) => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Modal
        title={title}
        centered
        radius="lg"
        overlayProps={{
          color: "#d3d3d3",
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        opened={opened}
        onClose={() => setOpened(false)}
      >
        <LineGraph labels={['dsf', "dsf"]} dataset={[1, 2]} />
      </Modal>

      <div
        className="col-span-1 p-4 cursor-pointer rounded-md shadow-lg hover:scale-105 ease-in-out duration-150"
        onClick={() => setOpened(true)}
      >
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Icon icon={icon} width={24} height={24} />
            <MediumText>
              {title}
            </MediumText>
          </div>
          <div className="text-md text-gray-800">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoCard;
