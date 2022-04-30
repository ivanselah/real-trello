import React from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { setBgColor } from '../atoms';
import { saveColorInLocalStorage } from '../localStorage.utils';

const COLOR_ARRAY = ['#fc5c65', '#45aaf2', '#4b6584', '#f7b731', '#1dd1a1'];

function PickColor() {
  const setBackGroundColor = useSetRecoilState(setBgColor);

  const handleColor = (color: string) => {
    setBackGroundColor(color);
    saveColorInLocalStorage({ id: 'bgColor', color });
  };

  return (
    <React.Fragment>
      <Container>
        <h1>배경</h1>
        {COLOR_ARRAY.map((color) => (
          <ColorBox key={color} bgColor={color} onClick={() => handleColor(color)}></ColorBox>
        ))}
      </Container>
    </React.Fragment>
  );
}

const Container = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  transform: translate(300px, 50px);
  max-width: 300px;
  display: flex;
  align-items: center;
  font-weight: bold;
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
