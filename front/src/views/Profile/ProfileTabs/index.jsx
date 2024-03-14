import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import PostedMessages from "../PostedMessages";
import LikedMessages from "../LikedMessages";

export default () => {
  return (
    <Tabs isFitted={true} w="100%" mt="10px" isLazy={true}>
      <TabList>
        <Tab>Posted</Tab>
        <Tab>Liked</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <PostedMessages />
        </TabPanel>
        <TabPanel>
          <LikedMessages />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
