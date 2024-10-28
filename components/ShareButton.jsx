'use client'
import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  EmailIcon,
} from 'react-share'

const ShareButtons = ({ property }) => {
  const shareURL = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`

  return (
    <>
      <h3 className='text-xl font-bold text-center'>Share This Property</h3>
      <div className='flex gap-3 justify-center pb-5'>
        <FacebookShareButton
          url={shareURL}
          quote={property.name}
          hashtag={`#${property.type.replace(/\s/g, '')} For Rent`}
        >
          <FacebookIcon size={40} round={true} />
        </FacebookShareButton>

        <TwitterShareButton
          url={shareURL}
          title={property.name}
          hashtags={[`${property.type.replace(/\s/g, '')} For Rent`]}
        >
          <TwitterIcon size={40} round={true} />
        </TwitterShareButton>

        <EmailShareButton
          url={shareURL}
          subject={property.name}
          body={`Checkout this listing: ${shareURL}`}
        >
          <EmailIcon size={40} round={true} />
        </EmailShareButton>
      </div>
    </>
  )
}

export default ShareButtons
