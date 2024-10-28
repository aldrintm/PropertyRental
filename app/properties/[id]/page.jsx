import ProperyHeaderImage from '@/components/PropertyHeaderImage'
import PropertyDetails from '@/components/PropertyDetails'
import PropertyImages from '@/components/PropertyImages'
import connectDB from '@/config/db'
import Property from '@/models/Property'
import Link from 'next/link'
import { FaArrowLeft } from 'react-icons/fa'
import NotFoundPage from './not-found'
import { convertToSerializeableObject } from '@/utils/convertToObject'
import BookmarkButton from '@/components/BookmarkButton'
import ShareButtons from '@/components/ShareButton'
import PropertyContactForm from '@/components/PropertyContactForm'

const PropertyPage = async ({ params }) => {
  await connectDB()

  // Update to clear error with convertToObject.js
  const propertyDocs = await Property.findById(params.id).lean()
  // we dont use .map because this is only for a single object
  const property = convertToSerializeableObject(propertyDocs)

  if (!property) {
    return (
      <h1 className='text-center text-2xl font-bold mt-10'>
        Property Not Found
      </h1>
    )
  }

  return (
    <>
      {property ? (
        <ProperyHeaderImage image={property.images[0]} />
      ) : (
        <NotFoundPage />
      )}

      {/* Go back section */}
      <section>
        <div className='container m-auto py-6 px-6'>
          <Link
            href='/properties'
            className='text-blue-500 hover:text-blue-600 flex items-center'
          >
            <FaArrowLeft className='mr-2' /> Back to Properties
          </Link>
        </div>
      </section>

      <section className='bg-blue-50'>
        <div className='container m-auto py-10 px-6'>
          <div className='grid grid-cols-1 md:grid-cols-70/30 w-full gap-6'>
            {/* Property Info */}
            <PropertyDetails property={property} />

            {/* // sidebar here */}
            <aside className='space-y-4'>
              <BookmarkButton property={property} />
              <ShareButtons property={property} />
              <PropertyContactForm property={property} />
            </aside>
          </div>
        </div>
      </section>
      <PropertyImages images={property.images} />
    </>
  )
}

export default PropertyPage
