import React, { Component } from 'react';
import {
  ChakraProvider,
  Heading,
  Text,
  HStack,
  Switch,
  Box,
  List,
  ListItem,
  Spinner,
} from '@chakra-ui/react';
import { UiLibrary } from './UiLibrary';
import Calculator from './components/Calculator';

export const topBarHeight = 50

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      basePartsSelected: [],
      resourcesNeeded: {},
      partsData: [],
    };
    this.addBasePart = this.addBasePart.bind(this);
    this.removeBasePart = this.removeBasePart.bind(this);
  }

  componentWillMount = () => {
    // get all data
    this.getParts();
  }

  getParts() {
    fetch('http://localhost:3001')
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ partsData: data })
      });
  }

  reset = () => {
    this.setState({ basePartsSelected: [] })
    this.setState({ resourcesNeeded: {} })
  }

  addBasePart = (name, resources) => {
    for (const resource in resources) {
      if (this.state.resourcesNeeded.hasOwnProperty(resource)) {
        // if resource already needed, add amount on to existing key/value pair
        this.setState(prevState => ({ resourcesNeeded: { ...prevState.resourcesNeeded, [resource]: prevState.resourcesNeeded[resource] += resources[resource] } }))
      } else {
        // create new key/value pair with resource name and amount needed
        this.setState(prevState => ({ resourcesNeeded: { ...prevState.resourcesNeeded, [resource]: resources[resource] } }))
      }
    }
    // add to base parts array
    this.setState(prevState => ({ basePartsSelected: [...prevState.basePartsSelected, name] }))
  }

  removeBasePart = (name, resources) => {
    if (this.state.basePartsSelected.includes(name)) {
      for (const resource in resources) {
        if (this.state.resourcesNeeded.hasOwnProperty(resource) && this.state.resourcesNeeded[resource] > 0) {
          this.setState(prevState => ({ resourcesNeeded: { ...prevState.resourcesNeeded, [resource]: prevState.resourcesNeeded[resource] -= resources[resource] } }))
        }
      }
      const newBasePartsArray = [...this.state.basePartsSelected]
      const index = newBasePartsArray.findIndex((element) => element === name)
      newBasePartsArray.splice(index, 1)
      this.setState({ basePartsSelected: newBasePartsArray })
    }
  }

  displayPartCount = () => {
    const counter = {}
    this.state.basePartsSelected.forEach(basePart => {
      if (!counter.hasOwnProperty(basePart)) {
        counter[basePart] = this.state.basePartsSelected.filter((element) => element === basePart).length
      }
    });
    const formattedCounter = []
    for (const part in counter) {
      if (Object.hasOwnProperty.call(counter, part)) {
        formattedCounter.push(<ListItem>{part}: {counter[part]}</ListItem>)
      }
    }
    return formattedCounter
  }

  unCamelCase = (string) => {
    const result = string.replace(/([A-Z])/g, " $1");
    const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
    return finalResult
  }

  render() {
    const colours = {
      headerBackground: UiLibrary.colours.steelBlue,
      pageBackground: UiLibrary.colours.steelBlue,
      pageBackgroundLight: UiLibrary.colours.lightSteelBlue,
      textLight: UiLibrary.colours.white,
      textDark: UiLibrary.colours.black,
      box: '',
    }

    return (
      <ChakraProvider theme={UiLibrary.theme}>

        <HStack
          w={'100vw'}
          h={`${topBarHeight}px`}
          justify={'space-between'}
          bg={colours.headerBackground}
          p={UiLibrary.consistency.halfSpace}
          borderBottom={`1px solid rgb(20,79,118)`}
        >
          <HStack spacing={0} align={'flex-end'}>
            <Heading color={UiLibrary.colours.logoOrange}>Subnautica</Heading>
            <Text color={colours.textLight} paddingBottom={'3px'} paddingLeft={UiLibrary.consistency.quarterSpace}>base planner</Text>
          </HStack>
        </HStack>
        <HStack
          w={'100vw'}
          h={`calc(100vh - ${topBarHeight}px)`}
          background={`
            linear-gradient(
              white,
              transparent
            ),
            linear-gradient(
              -45deg,
              ${colours.pageBackground},
              transparent
            ),
            linear-gradient(
              45deg,
              ${colours.pageBackgroundLight},
              transparent
            );

          `}
          backgroundBlendMode={'multiply'}
          padding={UiLibrary.consistency.fullSpace}
          alignContent={'flex-start'}
          flexWrap={'none'}
          spacing={3}
        >
          {this.state.partsData.length > 0 ?
            <>
              <Calculator
                addBasePart={this.addBasePart}
                removeBasePart={this.removeBasePart}
                data={this.state.partsData}
              />
              <Box
                w={'350px'}
                h={`calc(100vh - ${topBarHeight}px - 40px)`}
                p={'10px'}
                bg={'rgba( 255, 255, 255, 0.4 )'}
                boxShadow={'0 8px 32px 0 rgba( 31, 38, 135, 0.37 )'}
                backdropFilter={'blur( 6px )'}
                borderRadius={'10px'}
                border={'1px solid rgba( 255, 255, 255, 0.18 )'}
                overflowY={'scroll'}
              >
                <Heading color={UiLibrary.colours.darkBlue} size={'md'}>Selected Parts</Heading>
                <List textDecoration={'none'}>
                  {
                    this.displayPartCount()
                  }
                </List>
              </Box>
              <Box
                w={'350px'}
                h={`calc(100vh - ${topBarHeight}px - 40px)`}
                p={'10px'}
                bg={'rgba( 255, 255, 255, 0.4 )'}
                boxShadow={'0 8px 32px 0 rgba( 31, 38, 135, 0.37 )'}
                backdropFilter={'blur( 6px )'}
                borderRadius={'10px'}
                border={'1px solid rgba( 255, 255, 255, 0.18 )'}
                overflowY={'scroll'}
              >
                <Heading color={UiLibrary.colours.darkBlue} size={'md'}>Ingredients Needed</Heading>
                <List textDecoration={'none'}>
                  {
                    Object.keys(this.state.resourcesNeeded).map((each, key) => {
                      const value = this.state.resourcesNeeded[each]
                      if (value > 0) {
                        return <ListItem key={key}>{this.unCamelCase(each)}: {value}</ListItem>
                      }
                    })
                  }
                </List>
              </Box>
            </>
            :
            <Box width={'100vw'} align={'center'}>
              <Spinner size={'xl'} color={'white'} />
            </Box>

          }

        </HStack>

      </ChakraProvider>
    )
  }

}

export default App;
