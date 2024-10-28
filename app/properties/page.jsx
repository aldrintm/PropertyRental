import connectDB from '@/config/db'
import Property from '@/models/Property'
import PropertyCard from '@/components/PropertyCard'
import Pagination from '@/components/Pagination'

const PropertiesPage = async ({ searchParams: { page = 1, pageSize = 4 } }) => {
  // Destructure above deep into searchParams

  await connectDB()

  const skip = (page - 1) * pageSize
  const total = await Property.countDocuments({})

  // Lets check our variables to be certain
  console.log(page, pageSize, skip)

  const properties = await Property.find({}).skip(skip).limit(pageSize)

  const showPagination = total > pageSize

  return (
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        {properties.length === 0 ? (
          <p>No Properties Found</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}

        {showPagination && (
          <Pagination
            page={parseInt(page)}
            pageSize={parseInt(pageSize)}
            totalItems={total}
          />
        )}
      </div>
    </section>
  )
}

export default PropertiesPage
