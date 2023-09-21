import React from 'react';
import {
  Text,
  HStack,
  VStack,
  Wrap,
  Button,
} from '@chakra-ui/react';
import { UiLibrary } from '../UiLibrary';
import * as subnauticaData from '../data/subnautica.json';
import * as belowZeroData from '../data/below_zero.json';
import { topBarHeight } from '../App';

function PartsList(props) {

  const form = () => {
    let data = props.useBelowZero ? belowZeroData : subnauticaData
    let elementBoxes = [];
    for (let i = 0; i < data.length; i++) {
      const element = data[i]
      elementBoxes.push(
        <VStack
          h={'100px'}
          w={'150px'}
          bg={'rgba(200, 240, 255, 50%)'}
          backdropFilter={'blur(2px)'}
          border={'1px solid rgba(255, 255 ,255, 0.18)'}
          borderRadius={'15px'}
          bgColor={'rgba(255,255,255,0.25)'}
        >
          <HStack
            w={'100%'}
            h={'50px'}
            borderTopRadius={'15px'}
            justify={'center'}
          >
            <Text
              align={'center'}
              color={'white'}
            >{element.name}</Text>
          </HStack>
          <HStack>
            <Button
              onClick={() => props.removeBasePart(element.name, element.ingredients)}
              bg={UiLibrary.colours.steelBlue}
              color={UiLibrary.colours.white}
              size={'sm'}
            >-</Button>

            <Button
              onClick={() => props.addBasePart(element.name, element.ingredients)}
              bg={UiLibrary.colours.steelBlue}
              color={UiLibrary.colours.white}
              size={'sm'}
            >+</Button>
          </HStack>
        </VStack>
      )
    }
    return (
      <Wrap
        w={'400px'}
        bg={'transparent'}
        h={`calc(100vh - ${topBarHeight}px - 40px)`}
        overflowY={'scroll'}
        padding={UiLibrary.consistency.quarterSpace}
      >
        {elementBoxes}
      </Wrap>
    )
  }

  return (
    <HStack>
      {form()}
    </HStack>
  );
}

export default PartsList;
