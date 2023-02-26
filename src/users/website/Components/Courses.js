import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

export default function Courses() {
  return (
    <div>
      <div className="courses-part">
        <div className="container mx-auto">
          <h3 className="text-center font-bold text-black mb-14 text-4xl">
            Browse Our Top Courses
          </h3>
          <Tabs>
            <TabList>
              <Tab>Arts</Tab>
              <Tab>Medical</Tab>
              <Tab>Commerce</Tab>
              <Tab>Other</Tab>
            </TabList>

            <TabPanel>
              <h2>Any content 1</h2>
            </TabPanel>
            <TabPanel>
              <h2>Any content 2</h2>
            </TabPanel>
            <TabPanel>
              <h2>Any content 3</h2>
            </TabPanel>
            <TabPanel>
              <h2>Any content 4</h2>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
