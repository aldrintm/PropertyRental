import Property from '@/models/Property'
import connectDB from '@/config/db'
import User from '@/models/User'
import { getSessionUser } from '@/utils/getSessionUser'
import Image from 'next/image'
import Link from 'next/link'
import PropertyCard from '@/components/PropertyCard'

const SavedPropertiesPage = async () => {
  const sessionUser = await getSessionUser()

  const { userId } = sessionUser

  // lets get bookmarks from our database by destructuring from .populate('bookmarks')
  const { bookmarks } = await User.findById(userId).populate('bookmarks')

  if (!bookmarks || bookmarks.length === 0) {
    throw new Error('There are no saved properties')
  } else {
    console.log(bookmarks)
  }

  return (
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        <h1 className='text-3xl font-bold mb-6'>Your Saved Properties</h1>
        {bookmarks.length === 0 ? (
          <p>No Saved Properties</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {bookmarks.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  )

  //         {/* <!-- Listing 1 --> */}
  //         <div className="rounded-xl shadow-md relative">
  //           {/* <!-- Remove button --> */}
  //           <button
  //             className="absolute top-0 left-0 mt-2 ml-2 w-8 h-8 p-2 rounded-full bg-white flex items-center justify-center transition-colors hover:bg-red-100"
  //           >
  //             <i className="fas fa-trash text-red-600"></i>
  //           </button>
  //           <img
  //             src="images/properties/a1.jpg"
  //             alt=""
  //             className="object-cover rounded-t-xl"
  //           />
  //           <div className="p-4">
  //             <div className="text-left md:text-center lg:text-left mb-6">
  //               <div className="text-gray-600">Apartment</div>
  //               <h3 className="text-xl font-bold">Boston Commons Retreat</h3>
  //             </div>
  //             <h3
  //               className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right"
  //             >
  //               $4,200/mo
  //             </h3>

  //             <div className="flex justify-center gap-4 text-gray-500 mb-4">
  //               <p>
  //                 <i className="fa-solid fa-bed"></i> 3
  //                 <span className="md:hidden lg:inline">Beds</span>
  //               </p>
  //               <p>
  //                 <i className="fa-solid fa-bath"></i> 2
  //                 <span className="md:hidden lg:inline">Baths</span>
  //               </p>
  //               <p>
  //                 <i className="fa-solid fa-ruler-combined"></i>
  //                 1,500 <span className="md:hidden lg:inline">sqft</span>
  //               </p>
  //             </div>

  //             <div
  //               className="flex justify-center gap-4 text-green-900 text-sm mb-4"
  //             >
  //               <p><i className="fa-solid fa-money-bill"></i> Weekly</p>
  //               <p><i className="fa-solid fa-money-bill"></i> Monthly</p>
  //             </div>

  //             <div className="border border-gray-100 mb-5"></div>

  //             <div className="flex flex-col lg:flex-row justify-between mb-4">
  //               <div className="flex align-middle gap-2 mb-4 lg:mb-0">
  //                 <i
  //                   className="fa-solid fa-location-dot text-lg text-orange-700"
  //                 ></i>
  //                 <span className="text-orange-700"> Boston MA </span>
  //               </div>
  //               <a
  //                 href="property.html"
  //                 className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
  //               >
  //                 Details
  //               </a>
  //             </div>
  //           </div>
  //         </div>
  //         {/* <!-- Listing 2 --> */}
  //         <div className="rounded-xl shadow-md relative">
  //           {/* <!-- Remove button --> */}
  //           <button
  //             className="absolute top-0 left-0 mt-2 ml-2 w-8 h-8 p-2 rounded-full bg-white flex items-center justify-center transition-colors hover:bg-red-100"
  //           >
  //             <i className="fas fa-trash text-red-600"></i>
  //           </button>
  //           <img
  //             src="images/properties/b1.jpg"
  //             alt=""
  //             className="object-cover rounded-t-xl"
  //           />
  //           <div className="p-4">
  //             <div className="text-left md:text-center lg:text-left mb-6">
  //               <div className="text-gray-600">Loft</div>
  //               <h3 className="text-xl font-bold">Cozy Downtown Loft</h3>
  //             </div>
  //             <h3
  //               className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right"
  //             >
  //               $4,000/mo
  //             </h3>

  //             <div className="flex justify-center gap-4 text-gray-500 mb-4">
  //               <p>
  //                 <i className="fa-solid fa-bed"></i> 2
  //                 <span className="md:hidden lg:inline">Beds</span>
  //               </p>
  //               <p>
  //                 <i className="fa-solid fa-bath"></i> 2
  //                 <span className="md:hidden lg:inline">Baths</span>
  //               </p>
  //               <p>
  //                 <i className="fa-solid fa-ruler-combined"></i>
  //                 1,800 <span className="md:hidden lg:inline">sqft</span>
  //               </p>
  //             </div>

  //             <div
  //               className="flex justify-center gap-4 text-green-900 text-sm mb-4"
  //             >
  //               <p><i className="fa-solid fa-money-bill"></i> Weekly</p>
  //               <p><i className="fa-solid fa-money-bill"></i> Monthly</p>
  //             </div>

  //             <div className="border border-gray-100 mb-5"></div>

  //             <div className="flex flex-col lg:flex-row justify-between mb-4">
  //               <div className="flex align-middle gap-2 mb-4 lg:mb-0">
  //                 <i
  //                   className="fa-solid fa-location-dot text-lg text-orange-700"
  //                 ></i>
  //                 <span className="text-orange-700"> New York NY </span>
  //               </div>
  //               <Link
  //                 href="property.html"
  //                 className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
  //               >
  //                 Details
  //               </Link>
  //             </div>
  //           </div>
  //         </div>
  //         {/* <!-- Listing 3 --> */}
  //         <div className="rounded-xl shadow-md relative">
  //           {/* <!-- Remove button --> */}
  //           <button
  //             className="absolute top-0 left-0 mt-2 ml-2 w-8 h-8 p-2 rounded-full bg-white flex items-center justify-center transition-colors hover:bg-red-100"
  //           >
  //             <i className="fas fa-trash text-red-600"></i>
  //           </button>
  //           <img
  //             src="images/properties/c1.jpg"
  //             alt=""
  //             className="object-cover rounded-t-xl"
  //           />
  //           <div className="p-4">
  //             <div className="text-left md:text-center lg:text-left mb-6">
  //               <div className="text-gray-600">Condo</div>
  //               <h3 className="text-xl font-bold">Luxury Condo</h3>
  //             </div>
  //             <h3
  //               className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right"
  //             >
  //               $3,300/mo
  //             </h3>

  //             <div className="flex justify-center gap-4 text-gray-500 mb-4">
  //               <p>
  //                 <i className="fa-solid fa-bed"></i> 3
  //                 <span className="md:hidden lg:inline">Beds</span>
  //               </p>
  //               <p>
  //                 <i className="fa-solid fa-bath"></i> 2
  //                 <span className="md:hidden lg:inline">Baths</span>
  //               </p>
  //               <p>
  //                 <i className="fa-solid fa-ruler-combined"></i>
  //                 2,200 <span className="md:hidden lg:inline">sqft</span>
  //               </p>
  //             </div>

  //             <div
  //               className="flex justify-center gap-4 text-green-900 text-sm mb-4
  //             >
  //               <p><i className="fa-solid fa-money-bill"></i> Nightly</p>"
  //               <p><i className="fa-solid fa-money-bill"></i> Weekly</p>
  //               <p><i className="fa-solid fa-money-bill"></i> Monthly</p>
  //             </div>

  //             <div className="border border-gray-100 mb-5"></div>

  //             <div className="flex flex-col lg:flex-row justify-between mb-4">
  //               <div className="flex align-middle gap-2 mb-4 lg:mb-0">
  //                 <i
  //                   className="fa-solid fa-location-dot text-lg text-orange-700"
  //                 ></i>
  //                 <span className="text-orange-700"> Los Angeles CA </span>
  //               </div>
  //               <a
  //                 href="property.html"
  //                 className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
  //               >
  //                 Details
  //               </a>
  //             </div>
  //           </div>
  //         </div>
  //         {/* <!-- Listing 4 --> */}
  //         <div className="rounded-xl shadow-md relative">
  //           <!-- Remove button -->
  //           <button
  //             className="absolute top-0 left-0 mt-2 ml-2 w-8 h-8 p-2 rounded-full bg-white flex items-center justify-center transition-colors hover:bg-red-100"
  //           >
  //             <i className="fas fa-trash text-red-600"></i>
  //           </button>
  //           <img
  //             src="images/properties/d1.jpg"
  //             alt=""
  //             className="object-cover rounded-t-xl"
  //           />
  //           <div className="p-4">
  //             <div className="text-left md:text-center lg:text-left mb-6">
  //               <div className="text-gray-600">Cottage or Cabin</div>
  //               <h3 className="text-xl font-bold">Charming Cottage Getaway</h3>
  //             </div>
  //             <h3
  //               className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right"
  //             >
  //               $2,000/wk
  //             </h3>

  //             <div className="flex justify-center gap-4 text-gray-500 mb-4">
  //               <p>
  //                 <i className="fa-solid fa-bed"></i> 2
  //                 <span className="md:hidden lg:inline">Beds</span>
  //               </p>
  //               <p>
  //                 <i className="fa-solid fa-bath"></i> 1
  //                 <span className="md:hidden lg:inline">Baths</span>
  //               </p>
  //               <p>
  //                 <i className="fa-solid fa-ruler-combined"></i>
  //                 900 <span className="md:hidden lg:inline">sqft</span>
  //               </p>
  //             </div>

  //             <div
  //               className="flex justify-center gap-4 text-green-900 text-sm mb-4"
  //             >
  //               <p><i className="fa-solid fa-money-bill"></i> Weekly</p>
  //             </div>

  //             <div className="border border-gray-100 mb-5"></div>

  //             <div className="flex flex-col lg:flex-row justify-between">
  //               <div className="flex align-middle gap-2 mb-4 lg:mb-0">
  //                 <i
  //                   className="fa-solid fa-location-dot text-lg text-orange-700"
  //                 ></i>
  //                 <span className="text-orange-700"> Austin TX </span>
  //               </div>
  //               <a
  //                 href="property.html"
  //                 className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
  //               >
  //                 Details
  //               </a>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </section>)
}

export default SavedPropertiesPage
