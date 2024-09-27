import * as React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';

export default function TabsBasic() {
  return (
    <Tabs aria-label="Basic tabs" defaultValue={0}>
      <TabList sx={{height: '70px',justifyContent:'center'}}>
        <Tab sx={{width: '120px'}}>Mercedes -Benz</Tab>
        <Tab sx={{width: '120px'}}>Audi</Tab>
        <Tab sx={{width: '120px'}}>BMV</Tab>
        <Tab sx={{width: '120px'}}>PORSCHE</Tab>

      </TabList>
      <TabPanel value={0}>
        <b>First</b>
      </TabPanel>
      <TabPanel value={1}>
        <b>Second</b> tab panel
      </TabPanel>
      <TabPanel value={2}>
        <b>Third</b> tab panel
      </TabPanel>
      <TabPanel value={3}>
        <b>Third</b> tab panel
      </TabPanel>
    </Tabs>
  );
}