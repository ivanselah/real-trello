import React from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { setBgColor } from '../atoms';

function PickColor() {
  const colorArray = ['#686de0', '#1e90ff', '#ff6b81', '#30336b', '#1dd1a1'];
  const setBackGroundColor = useSetRecoilState(setBgColor);

  const handleColor = (color: string) => {
    setBackGroundColor(color);
  };

  return (
    <React.Fragment>
      <Container>
        {colorArray.map((color) => (
          <ColorBox key={color} bgColor={color} onClick={() => handleColor(color)}></ColorBox>
        ))}
      </Container>
    </React.Fragment>
  );
}

const Container = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  transform: translate(30px, -50px);
  max-width: 300px;
  display: flex;
  list-style-type: none;
  cursor: pointer;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 15px;
`;

const ColorBox = styled.li<{ bgColor: string }>`
  width: 50px;
  height: 50px;
  background-color: ${(props) => props.bgColor};
  margin: 0 5px;
  &:hover {
    opacity: 0.8;
  }
`;

export default PickColor;
