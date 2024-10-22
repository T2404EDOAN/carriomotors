import React from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import styled from 'styled-components';

const StyledNode = styled.div`
  padding: 5px;
  border-radius: 8px;
  display: inline-block;
  border: 1px solid #ccc;
  font-size: 16px;
  
  @media (max-width: 768px) {
    font-size: 12px;
    padding: 4px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
    padding: 3px;
  }
`;

const StyledHomeNode = styled(StyledNode)`
  background-color: #ffcccb;
`;

const StyledTreeNode = styled(TreeNode)`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > .rst__lineChildren {
    height: auto !important;
  }
`;

const StyledNextLevelNode = styled(StyledNode)`
  background-color: #e6e6fa;
`;

const StyledAdditionalNode = styled(StyledNode)`
  background-color: #e0ffff;
`;

const StyledInstructionNode = styled(StyledNode)`
  background-color: #90ee90;
`;

function SiteMap() {
  return (
    <div style={{ width: '100%', margin: '0 auto', overflowX: 'auto', marginTop: '30px', minHeight: '800px' }}>
      <Tree
        lineWidth={'2px'}
        lineColor={'#ccc'}
        lineBorderRadius={'10px'}
        label={<StyledHomeNode>Carrio Motors</StyledHomeNode>}
      >
        <TreeNode label={<StyledNextLevelNode>Home Page</StyledNextLevelNode>}>
          <TreeNode label={<StyledAdditionalNode>Header</StyledAdditionalNode>} />
          <TreeNode label={<StyledAdditionalNode>Banner</StyledAdditionalNode>} />
          <TreeNode label={<StyledAdditionalNode>Brand</StyledAdditionalNode>} />
          <TreeNode label={<StyledAdditionalNode>Driver</StyledAdditionalNode>} />
          <TreeNode label={<StyledAdditionalNode>Carrio Motors Social</StyledAdditionalNode>} />
          <TreeNode label={<StyledAdditionalNode>Footer</StyledAdditionalNode>} />
        </TreeNode>
        <TreeNode label={<StyledNextLevelNode>Vehicles Page</StyledNextLevelNode>}>
          <TreeNode label={<StyledAdditionalNode>Filter Vehicles</StyledAdditionalNode>} />
          <TreeNode label={<StyledAdditionalNode>List Vehicles</StyledAdditionalNode>} />
          <TreeNode label={<StyledAdditionalNode>Vehicle Details</StyledAdditionalNode>}>
            <TreeNode label={<StyledAdditionalNode>Exterior Color</StyledAdditionalNode>}>
              <TreeNode label={<StyledAdditionalNode>Technical Data</StyledAdditionalNode>} />
              <TreeNode label={<StyledAdditionalNode>Standard Equipment</StyledAdditionalNode>} />
            </TreeNode>
            <TreeNode label={<StyledAdditionalNode>Finance</StyledAdditionalNode>} />
            <TreeNode label={<StyledAdditionalNode>Location</StyledAdditionalNode>} />
          </TreeNode>
        </TreeNode>
        <TreeNode label={<StyledNextLevelNode>Services Page</StyledNextLevelNode>}>
          <TreeNode label={<StyledAdditionalNode>Mercedes Services page</StyledAdditionalNode>} />
          <TreeNode label={<StyledAdditionalNode>BMW Services page</StyledAdditionalNode>} />
          <TreeNode label={<StyledAdditionalNode>Audi Services page</StyledAdditionalNode>} />
          <TreeNode label={<StyledAdditionalNode>Porsche Services page</StyledAdditionalNode>} />
        </TreeNode>
        <TreeNode label={<StyledNextLevelNode>Finance Page</StyledNextLevelNode>}>
          <TreeNode label={<StyledAdditionalNode>Mercedes Finance page</StyledAdditionalNode>} />
          <TreeNode label={<StyledAdditionalNode>BMW Finance page</StyledAdditionalNode>} />
          <TreeNode label={<StyledAdditionalNode>Audi Finance page</StyledAdditionalNode>} />
          <TreeNode label={<StyledAdditionalNode>Porsche Finance page</StyledAdditionalNode>} />
        </TreeNode>
        <TreeNode label={<StyledNextLevelNode>Warranty Page</StyledNextLevelNode>}></TreeNode>
        <TreeNode label={<StyledNextLevelNode>About Us Page</StyledNextLevelNode>}>
          <TreeNode label={<StyledAdditionalNode>Our Company page</StyledAdditionalNode>} />
          <TreeNode label={<StyledAdditionalNode>Contact Dealer page</StyledAdditionalNode>} />
          <TreeNode label={<StyledAdditionalNode>Contact Us page</StyledAdditionalNode>} />
          <TreeNode label={<StyledAdditionalNode>Location page</StyledAdditionalNode>} />
          <TreeNode label={<StyledAdditionalNode>Site Map page</StyledAdditionalNode>} />
        </TreeNode>
      </Tree>
    </div>
  );
}

export default SiteMap;
