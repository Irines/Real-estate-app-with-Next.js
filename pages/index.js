import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Box, Button, Flex, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { baseUrl, fetchApi } from '@/utils/fetchApi'
import Property from '@/components/Property'

const inter = Inter({ subsets: ['latin'] })

const Banner = ({purpose, imageUrl, title1, title2, descr1, descr2, linkName, buttonText}) => (
  <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10">
    <Image src={imageUrl} width={500} height={300} alt="banner"/>
    <Box p="5">
      <Text fontSize="sm" fontWeight="medium" color="gray.500">{purpose}</Text>
      <Text fontSize="3xl" fontWeight="bold">{title1}<br/>{title2}</Text>
      <Text fontSize="lg" color="gray.700" paddingTop="3" paddingBottom="3">{descr1}<br/>{descr2}</Text>
      <Button fontSize="xl">
        <Link href={linkName}>{buttonText}</Link>
      </Button>
    </Box>
  </Flex>
)

export default function Home({propertyForRent, propertyForSale}) {
  console.log(propertyForRent, propertyForSale)

  return (
    <Box>
      <h1>Here will be banner</h1>
      <Banner 
        purpose={'RENT A HOME'}
        title1="Rental Homes for"
        title2="Everyone"
        descr1="Explore Apartments, Villas, Homes"
        descr2="and more"
        buttonText="Explore Renting"
        linkName="/search?purpose=for-rent"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
      />
      <Flex flexWrap="wrap">
        {propertyForRent.map((property) => <Property property={property} key={property.id}/>)}
      </Flex>
      <Banner 
        purpose={'BUY A HOME'}
        title1="Find, Buy & Own Your"
        title2="Dream Home"
        descr1="Explore Apartments, Villas, Homes"
        descr2="and more"
        buttonText="Explore Buying"
        linkName="/search?purpose=for-sale"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008"
      />
      <Flex flexWrap="wrap">
        {propertyForSale.map((property) => <Property property={property} key={property.id}/>)}
      </Flex>
    </Box>
  )
}

export async function getStaticProps () {
  const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`)
  const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`)
  return {
    props: {
      propertyForSale: propertyForSale?.hits,
      propertyForRent: propertyForRent?.hits
    }
  }
}