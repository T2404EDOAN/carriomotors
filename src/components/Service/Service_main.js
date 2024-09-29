import * as React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import Audi_main from '../Audi/Audi_main';
import Porsche_main from '../Porsche/Porsche';
import Mec_main from '../Mec/Mec_main';
import Bmv_main from '../BMV/Bmv_main';

export default function TabsBasic() {
  return (
    <Tabs aria-label="Basic tabs" defaultValue={0}>
      <TabList sx={{height: '70px',justifyContent:'center'}}>
        <Tab sx={{width: '120px'}}>Mercedes -Benz</Tab>
        <Tab sx={{width: '120px'}}>BMV</Tab>
        <Tab sx={{width: '120px'}}>Audi</Tab>
      
        <Tab sx={{width: '120px'}}>PORSCHE</Tab>

      </TabList>
      <TabPanel value={0}>
      <Mec_main />
      </TabPanel>
      <TabPanel value={1}>
       <Bmv_main/>
      </TabPanel>
      <TabPanel value={2}>
       <Audi_main />
      </TabPanel>
      <TabPanel value={3}>
        <Porsche_main />
      </TabPanel>
    </Tabs>
  );
}