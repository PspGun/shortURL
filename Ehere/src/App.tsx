import * as React from "react"
import
{
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Center,
  Input,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  toast,
  useToast,
  useClipboard,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Logo } from "./Logo"
import './index.css'
import { useState } from "react"
const axios = require( 'axios' ).default;


export const App = () =>
{


  const [ url, seturl ] = useState(
    ''
  );
  const [ link, setlink ] = useState(
    ''
  );
  const [ urlwa, seturlwa ] = useState(
    ''
  )
  const { hasCopied, onCopy } = useClipboard( 'https://s.pspgun.com/' + urlwa )
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast();
  const [ loading, setloading ] = useState(
    false
  )
  const sub = async () =>
  {
    setloading( true )
    try
    {
      const data = await axios.post( '/shorten', { url, path: link } )
      console.log( data )
      seturlwa( data.data.path )
      onOpen()
      setloading( false )
    } catch ( error )
    {
      setloading( false )
      toast( { status: 'error', title: 'ทำไม่ได้โว้ยยยย', position: 'top' } )
    }
  }

  return (
    <>
      <Modal
        isCentered
        onClose={ onClose }
        isOpen={ isOpen }
        motionPreset='slideInBottom'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Your link is</ModalHeader>
          <ModalHeader>https://s.pspgun.com/{ urlwa }</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Button colorScheme='blue' mr={ 3 } onClick={ onCopy }> Copy</Button>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={ 3 } onClick={ onClose }>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Center>
        <Box p={ '20' } marginTop={ '100' } textAlign={ 'center' } bgColor='gray.200' w={ '50%' } h={ '500' } borderRadius={ '50' }>

          <Text mt={ 5 }>url</Text>
          <Input mt={ 5 } placeholder='Basic usage' variant='filled' value={ url } onChange={ ( e ) =>
          {
            seturl( e.target.value )
          } } />
          <Text mt={ 5 }>ShrotUrl</Text>
          <Input mt={ 5 } placeholder='Basic usage' variant='filled' value={ link } onChange={ ( e ) =>
          {
            setlink( e.target.value )
          } } />
          <Button colorScheme='blue' mt={ 10 } w='100%' isDisabled={ !link } onClick={ sub } isLoading={ loading } >Button</Button>
        </Box>
      </Center>
    </>
  )
}
