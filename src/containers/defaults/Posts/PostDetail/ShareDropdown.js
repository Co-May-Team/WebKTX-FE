import {
  FaEnvelope,
  FaFacebook,
  FaLinkedin,
  FaReddit,
  FaTelegram,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa"
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share"

export default function ShareDropdown() {
  return (
    <div className='absolute origin-top-right right-0 w-56 mt-2 bg-white dark:bg-neutral-900 rounded-lg divide-y divide-neutral-100 shadow-lg ring-1 ring-black dark:ring-white ring-opacity-5 dark:ring-opacity-10 focus:outline-none z-30 transform opacity-100 scale-100 animate__animated animate__zoomIn animate__faster'>
      <div
        className='px-1 py-3 text-sm text-neutral-6000 dark:text-neutral-300'
        role='none'
      >
        <button className='flex items-center rounded-md w-full px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 truncate focus:outline-none'>
          <FacebookShareButton url={window.location.href}>
            <FaFacebook className='mr-1 w-7 text-base inline' />
            <span className='truncate'>Facebook</span>
          </FacebookShareButton>
        </button>
        <button className='flex items-center rounded-md w-full px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 truncate focus:outline-none'>
          <TwitterShareButton url={window.location.href}>
            <FaTwitter className='mr-1 w-7 text-base inline' />
            <span className='truncate'>Twitter</span>
          </TwitterShareButton>
        </button>
        <button className='flex items-center rounded-md w-full px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 truncate focus:outline-none'>
          <LinkedinShareButton url={window.location.href}>
            <FaLinkedin className='mr-1 w-7 text-base inline' />
            <span className='truncate'>LinkedIn</span>
          </LinkedinShareButton>
        </button>
        <button className='flex items-center rounded-md w-full px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 truncate focus:outline-none'>
          <TelegramShareButton url={window.location.href}>
            <FaTelegram className='mr-1 w-7 text-base inline' />
            <span className='truncate'>Telegram</span>
          </TelegramShareButton>
        </button>
        <button className='flex items-center rounded-md w-full px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 truncate focus:outline-none'>
          <WhatsappShareButton url={window.location.href}>
            <FaWhatsapp className='mr-1 w-7 text-base inline' />
            <span className='truncate'>Whatsapp</span>
          </WhatsappShareButton>
        </button>
        <button className='flex items-center rounded-md w-full px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 truncate focus:outline-none'>
          <RedditShareButton url={window.location.href}>
            <FaReddit className='mr-1 w-7 text-base inline' />
            <span className='truncate'>Reddit</span>
          </RedditShareButton>
        </button>
        <button className='flex items-center rounded-md w-full px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 truncate focus:outline-none'>
          <EmailShareButton url={window.location.href}>
            <FaEnvelope className='mr-1 w-7 text-base inline' />
            <span className='truncate'>Email</span>
          </EmailShareButton>
        </button>
      </div>
    </div>
  )
}
