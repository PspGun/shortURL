import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  useToast,
  VStack,
  HStack,
  useClipboard,
  IconButton,
  Link as ChakraLink,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import {
  MdContentCopy,
  MdLink,
  MdOpenInNew,
  MdCheck,
  MdOutlineQrCode,
} from "react-icons/md";

import QRCode from "react-qr-code";
import axios from "axios";

const App = () => {
  const [url, setUrl] = useState("");
  const [customPath, setCustomPath] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const fullShortUrl = `https://s.pspgun.com/${shortUrl}`;
  const { hasCopied, onCopy } = useClipboard(fullShortUrl);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/shorten', {
        url,
        path: customPath
      });
      setShortUrl(response.data.path);
      toast({
        title: "URL shortened successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top"
      });
    } catch (error) {
      toast({
        title: "Error shortening URL",
        description: "Please try again",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
      <Box
          minH="100vh"
          bg="purple.400"
          py={20}
      >
        <Container maxW="container.md">
          <Box
              bg="white"
              p={8}
              borderRadius="2xl"
              boxShadow="2xl"
          >
            <VStack spacing={8}>
              {/* Header */}
              <Flex align="center">
                <Box
                    p={2}
                    bg="purple.100"
                    borderRadius="lg"
                    mr={3}
                >
                  <MdLink
                      size={24}
                      color="var(--chakra-colors-purple-500)"
                  />
                </Box>
                <Heading size="lg">URL Shortener GUGUN</Heading>
              </Flex>

              {/* Form */}
              <VStack spacing={6} w="full">
                <FormControl>
                  <FormLabel>Long URL</FormLabel>
                  <Input
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="Enter your long URL here"
                      size="lg"
                      variant="filled"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Custom Path (optional)</FormLabel>
                  <InputGroup size="lg">
                    <InputLeftAddon>s.pspgun.com/</InputLeftAddon>
                    <Input
                        value={customPath}
                        onChange={(e) => setCustomPath(e.target.value)}
                        placeholder="custom-path"
                        variant="filled"
                    />
                  </InputGroup>
                </FormControl>

                <Button
                    colorScheme="purple"
                    size="lg"
                    width="full"
                    onClick={handleSubmit}
                    isLoading={loading}
                    loadingText="Shortening..."
                    isDisabled={!url}
                    leftIcon={<MdLink />}
                >
                  Shorten URL
                </Button>
              </VStack>

              {/* Result */}
              {shortUrl && (
                  <Box
                      w="full"
                      p={4}
                      bg="gray.50"
                      borderRadius="lg"
                  >
                    <Tabs isFitted variant="enclosed" colorScheme="purple">
                      <TabList mb="1em">
                        <Tab><HStack><MdLink />
                          <Text>Short URL</Text>
                        </HStack></Tab>
                        <Tab><HStack><MdOutlineQrCode />
                          <Text>QR Code</Text>
                        </HStack></Tab>
                      </TabList>
                      <TabPanels>
                        <TabPanel>
                          <Flex
                              justify="space-between"
                              align="center"
                              bg="white"
                              p={4}
                              borderRadius="lg"
                              border="1px"
                              borderColor="gray.200"
                          >
                            <HStack spacing={2}>
                              <ChakraLink
                                  href={fullShortUrl}
                                  isExternal
                                  color="purple.600"
                              >
                                s.pspgun.com/{shortUrl}
                              </ChakraLink>
                              <MdOpenInNew color="var(--chakra-colors-gray-500)" />
                            </HStack>
                            <IconButton
                                icon={hasCopied ? <MdCheck /> : <MdContentCopy />}
                                onClick={onCopy}
                                aria-label="Copy URL"
                                variant="ghost"
                                colorScheme={hasCopied ? "green" : "gray"}
                            />
                          </Flex>
                        </TabPanel>
                        <TabPanel>
                          <VStack spacing={4}>
                            <Box
                                p={4}
                                bg="white"
                                borderRadius="lg"
                                border="1px"
                                borderColor="gray.200"
                            >
                              <QRCode
                                  value={fullShortUrl}
                                  size={200}
                                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                  viewBox={`0 0 256 256`}
                              />
                            </Box>
                            <Text fontSize="sm" color="gray.600">
                              Scan this QR code to access your shortened URL
                            </Text>
                          </VStack>
                        </TabPanel>
                      </TabPanels>
                    </Tabs>
                  </Box>
              )}
            </VStack>
          </Box>
        </Container>
      </Box>
  );
};

export default App;