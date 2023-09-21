import React, { useState, useEffect } from 'react';
import {
  Text,
  HStack,
  List,
  ListItem,
  Box,
  Input,
  VStack,
} from '@chakra-ui/react';
import { UiLibrary } from '../UiLibrary';
import { topBarHeight } from '../App';


function Calculator(props) {

  const [searchString, setSearchString] = useState('');
  const [data, setData] = useState(props.data);

  useEffect(() => {
    setData(props.data.filter(component => {
      return component.name.toLowerCase().includes(searchString.toLowerCase())
    }))
  }, [searchString])

  const form = () => {
    console.log(data)
    let elements = [];
    for (let i = 0; i < data.length; i++) {
      const element = data[i]
      elements.push(
        <ListItem key={i} styletype={'none'}>
          <HStack width={'300px'} justify={'space-between'}>
            <Text>{element.name}</Text>
            <HStack>
              <button
                onClick={() => props.removeBasePart(element.name, element.ingredients)}
                style={{
                  width: '30px',
                  height: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '30px',
                  border: `${UiLibrary.colours.darkOrange} 1px solid`,
                  color: UiLibrary.colours.darkOrange,
                  background: UiLibrary.colours.lightOrange,
                  fontSize:'18px',
                }}
              >-</button>
              <button 
                onClick={() => props.addBasePart(element.name, element.ingredients)}
                style={{
                  width: '30px',
                  height: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '30px',
                  border: `${UiLibrary.colours.darkBlue} 1px solid`,
                  color: UiLibrary.colours.darkBlue,
                  background: UiLibrary.colours.lightBlue
                }}
              >+</button>
            </HStack> 
          </HStack>
        </ListItem>
      )
    }
    return (
      <Box 
        overflowY={'scroll'}
        h={`calc(100vh - ${topBarHeight}px - 40px)`} 
      >
        <List spacing={2}>{elements}</List>
      </Box>
    )
  }

  return (
    <VStack
    h={`calc(100vh - ${topBarHeight}px - 40px)`} 
    w={'350px'} 
    p={5} 
    bg={ 'rgba( 255, 255, 255, 0.4 )'}
    boxShadow={ '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )'}
    backdropFilter={ 'blur( 6px )'}
    borderRadius={'10px'}
    border={'1px solid rgba( 255, 255, 255, 0.18 )'}
    >
      <Input
        type={'text'}
        onChange={e => setSearchString(e.target.value)}
        value={searchString}
      />
      {form()}
    </VStack>
  );
}

export default Calculator;
