import {
  FaFacebook,
  FaLinkedinIn,
  FaReddit,
  FaTelegram,
  FaTwitter,
  FaWarehouse,
  FaWhatsapp,
} from 'react-icons/fa'
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share'

const ShareButtons = ({ url }) => {
  return (
    <>
      <FacebookShareButton url={url}>
        <FaFacebook className="fs-3" />
      </FacebookShareButton>
      <TwitterShareButton url={url}>
        <FaTwitter className="fs-3" />
      </TwitterShareButton>
      <LinkedinShareButton url={url}>
        <FaLinkedinIn className="fs-3" />
      </LinkedinShareButton>
      <RedditShareButton url={url}>
        <FaReddit className="fs-3" />
      </RedditShareButton>
      <TelegramShareButton url={url}>
        <FaTelegram className="fs-3" />
      </TelegramShareButton>
      <WhatsappShareButton url={url}>
        <FaWhatsapp className="fs-3" />
      </WhatsappShareButton>
      <EmailShareButton url={url}>
        <FaWarehouse className="fs-3" />
      </EmailShareButton>
    </>
  )
}

export default ShareButtons
