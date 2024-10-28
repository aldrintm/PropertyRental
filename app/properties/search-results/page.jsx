import connectDB from '@/config/db'
import Property from '@/models/Property'
import { convertToSerializeableObject } from '@/utils/convertToObject'
import Link from 'next/link'
import PropertyCard from '@/components/PropertyCard'
import PropertySearchForm from '@/components/PropertySearchForm'
import { FaArrowAltCircleLeft } from 'react-icons/fa'

const SearchResultsPage = async ({
  searchParams: { location, propertyType },
}) => {
  await connectDB()
  const locationPattern = new RegExp(location, 'i')
  let query = {
    $or: [
      { name: locationPattern },
      { description: locationPattern },
      { 'location.street': locationPattern },
      { 'location.city': locationPattern },
      { 'location.state': locationPattern },
      { 'location.zipcode': locationPattern },
    ],
  }

  if (propertyType && propertyType !== 'All') {
    const typePattern = new RegExp(propertyType, 'i')
    query.type = typePattern
  }

  const propertiesQueryResults = await Property.find(query).lean()
  const properties = convertToSerializeableObject(propertiesQueryResults)

  console.log(properties)

  return (
    <>
      <section className='bg-blue-700 py-4 px-4'>
        <div className='max-w-7xl max-auto flex flex-col items-start sm:px-6 lg:px-8'>
          <PropertySearchForm />
        </div>
      </section>
      <section className='px-4 py-6'>
        <div className='bg-white container-xl lg:container mx-auto px-4 py-6'>
          <Link
            href='/properties'
            className='flex items-center text-blue-500 hover:underline mb-3'
          >
            <FaArrowAltCircleLeft className='mr-3 mb-1' />
            Back to Properties
          </Link>
          <h1 className='text-2xl mb-4 font-medium text-gray-800'>
            Search Results
          </h1>
          {properties.length === 0 ? (
            <p>Search Results Not Found</p>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {properties.map((property) => (
                <PropertyCard key={Property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default SearchResultsPage
