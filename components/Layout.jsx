import { Box } from "@chakra-ui/react";
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => (
  <>
    <Head>
      <title>Real Estate</title>
    </Head>
    <Box maxWidth="1280px" m="auto">
      <Navbar/>
      <main>{children}</main>
      <footer><Footer></Footer></footer>
    </Box>
  </>
);

export default Layout;
