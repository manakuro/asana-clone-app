import { createIcon } from '@chakra-ui/react';

import {
  AiFillCheckCircle,
  AiFillLike,
  AiFillPlayCircle,
  AiOutlineFilePdf,
  AiOutlineFileText,
  AiOutlineLike,
  AiOutlineProject,
} from 'react-icons/ai';
import {
  BiArrowToRight,
  BiAt,
  BiBarChart,
  BiBeenHere,
  BiBell,
  BiBookAdd,
  BiBookOpen,
  BiCalendar,
  BiCalendarAlt,
  BiCheck,
  BiCheckCircle,
  BiChevronDown,
  BiChevronLeft,
  BiChevronRight,
  BiCodeAlt,
  BiCommentDots,
  BiCompass,
  BiCopyAlt,
  BiCustomize,
  BiDetail,
  BiDotsHorizontalRounded,
  BiDownArrowAlt,
  BiDownload,
  BiEditAlt,
  BiExpand,
  BiFileBlank,
  BiFilter,
  BiFilterAlt,
  BiGitPullRequest,
  BiGridAlt,
  BiGridHorizontal,
  BiGridVertical,
  BiGroup,
  BiHelpCircle,
  BiHome,
  BiIdCard,
  BiImageAlt,
  BiInfoCircle,
  BiLayerPlus,
  BiLayout,
  BiLeftArrowAlt,
  BiLeftIndent,
  BiLink,
  BiLinkExternal,
  BiListOl,
  BiListPlus,
  BiListUl,
  BiLockAlt,
  BiMenu,
  BiMessageRounded,
  BiMessageRoundedDots,
  BiMobile,
  BiMoveVertical,
  BiMovie,
  BiNotification,
  BiPause,
  BiPencil,
  BiPhotoAlbum,
  BiPlay,
  BiPlayCircle,
  BiPlus,
  BiRightIndent,
  BiRocket,
  BiSave,
  BiSearch,
  BiShapePolygon,
  BiSliderAlt,
  BiSort,
  BiSpreadsheet,
  BiSquareRounded,
  BiStrikethrough,
  BiSubdirectoryRight,
  BiSun,
  BiTable,
  BiTask,
  BiTime,
  BiTrash,
  BiTrashAlt,
  BiUnlink,
  BiUser,
  BiUserPlus,
  BiX,
} from 'react-icons/bi';
import { BsTagFill } from 'react-icons/bs';
import { FaGithub, FaMoon, FaRegStar, FaStar, FaTwitter } from 'react-icons/fa';
import { FiBold, FiItalic, FiUnderline } from 'react-icons/fi';
import { HiOutlineEmojiHappy, HiOutlineMail } from 'react-icons/hi';
import { IoMdAttach } from 'react-icons/io';
import { MdSort, MdTextFormat } from 'react-icons/md';
import { TiFlowChildren } from 'react-icons/ti';

export const icons = {
  arrowDownAlt: BiDownArrowAlt,
  arrowLeftAlt: BiLeftArrowAlt,
  arrowToRight: BiArrowToRight,
  at: BiAt,
  attach: IoMdAttach,
  barChart: BiBarChart,
  beenHere: BiBeenHere,
  bell: BiBell,
  bold: FiBold,
  bookAdd: BiBookAdd,
  bookOpen: BiBookOpen,
  calendar: BiCalendar,
  calendarAlt: BiCalendarAlt,
  check: BiCheck,
  checkCircle: BiCheckCircle,
  checkCircleFilled: AiFillCheckCircle,
  chevronDown: BiChevronDown,
  chevronLeft: BiChevronLeft,
  chevronRight: BiChevronRight,
  codeAlt: BiCodeAlt,
  commentDots: BiCommentDots,
  compass: BiCompass,
  copyAlt: BiCopyAlt,
  customize: BiCustomize,
  detail: BiDetail,
  dotsHorizontalRounded: BiDotsHorizontalRounded,
  download: BiDownload,
  editAlt: BiEditAlt,
  emojiHappy: HiOutlineEmojiHappy,
  fileBlank: BiFileBlank,
  fillLike: AiFillLike,
  filter: BiFilter,
  filterAlt: BiFilterAlt,
  flowChildren: TiFlowChildren,
  fullscreenOutline: BiExpand,
  gitPullRequest: BiGitPullRequest,
  github: FaGithub,
  gridAlt: BiGridAlt,
  gridHorizontal: BiGridHorizontal,
  gridVertical: BiGridVertical,
  group: BiGroup,
  help: BiHelpCircle,
  home: BiHome,
  idCard: BiIdCard,
  imageAlt: BiImageAlt,
  infoCircle: BiInfoCircle,
  italic: FiItalic,
  layerPlus: BiLayerPlus,
  layout: BiLayout,
  leftIndent: BiLeftIndent,
  link: BiLink,
  linkExternal: BiLinkExternal,
  listOl: BiListOl,
  listPlus: BiListPlus,
  listUl: BiListUl,
  lockAlt: BiLockAlt,
  mailOutline: HiOutlineMail,
  menu: BiMenu,
  messageRounded: BiMessageRounded,
  messageRoundedDots: BiMessageRoundedDots,
  mobile: BiMobile,
  moon: FaMoon,
  moveVertical: BiMoveVertical,
  movie: BiMovie,
  notification: BiNotification,
  outlineFilePdf: AiOutlineFilePdf,
  outlineFileText: AiOutlineFileText,
  outlineLike: AiOutlineLike,
  outlineProject: AiOutlineProject,
  pause: BiPause,
  pencil: BiPencil,
  photoAlbum: BiPhotoAlbum,
  play: BiPlay,
  playCircle: AiFillPlayCircle,
  playCircleOutline: BiPlayCircle,
  plus: BiPlus,
  tag: BsTagFill,
  rightIndent: BiRightIndent,
  rocket: BiRocket,
  save: BiSave,
  search: BiSearch,
  shapePolygon: BiShapePolygon,
  sliderAlt: BiSliderAlt,
  sort2: BiSort,
  sort: MdSort,
  spreadsheet: BiSpreadsheet,
  squareRounded: BiSquareRounded,
  starFilled: FaStar,
  starOutline: FaRegStar,
  strikethrough: BiStrikethrough,
  subdirectoryRight: BiSubdirectoryRight,
  sun: BiSun,
  table: BiTable,
  task: BiTask,
  textFormat: MdTextFormat,
  time: BiTime,
  trash: BiTrash,
  trashAlt: BiTrashAlt,
  twitter: FaTwitter,
  underline: FiUnderline,
  unlink: BiUnlink,
  user: BiUser,
  userPlus: BiUserPlus,
  x: BiX,
} as const;

export type IconType = keyof typeof icons;

// @see https://simpleicons.org/?q=go
export const Medium = createIcon({
  viewBox: '0 0 20 20',
  path: (
    <path
      d="M11.2834 10C11.2878 11.5015 10.6962 12.9433 9.63837 14.0089C8.58059 15.0745 7.14314 15.6767 5.64169 15.6833C4.14024 15.6767 2.7028 15.0745 1.64501 14.0089C0.587232 12.9433 -0.00440595 11.5015 2.47069e-05 10C-0.00440595 8.49854 0.587232 7.0567 1.64501 5.9911C2.7028 4.92551 4.14024 4.32328 5.64169 4.31666C7.14314 4.32328 8.58059 4.92551 9.63837 5.9911C10.6962 7.0567 11.2878 8.49854 11.2834 10ZM17.4667 10C17.4667 12.95 16.2084 15.35 14.65 15.35C13.0917 15.35 11.825 12.95 11.825 10C11.825 7.05 13.0917 4.65 14.65 4.65C16.2084 4.65 17.4667 7.05 17.4667 10ZM20 10C20 12.6417 19.5584 14.7917 19.0084 14.7917C18.4584 14.7917 18.0167 12.6417 18.0167 10C18.0167 7.35833 18.4584 5.20833 19.0084 5.20833C19.5584 5.20833 20 7.35833 20 10Z"
      fill="currentColor"
    />
  ),
});

export const Golang = createIcon({
  viewBox: '0 0 30 30',
  path: (
    <path
      d="M2.26375 12.7888C2.205 12.7888 2.19125 12.76 2.22 12.715L2.5275 12.3213C2.55625 12.2775 2.62875 12.2488 2.6875 12.2488H7.9025C7.96 12.2488 7.975 12.2925 7.94625 12.3363L7.6975 12.715C7.66875 12.76 7.595 12.8025 7.55125 12.8025L2.26375 12.7888ZM0.0587508 14.1325C8.45636e-07 14.1325 -0.0149992 14.1038 0.0150008 14.06L0.321251 13.665C0.350001 13.6213 0.423751 13.5925 0.482501 13.5925H7.1425C7.20125 13.5925 7.23 13.6363 7.215 13.68L7.09875 14.03C7.08375 14.0888 7.02625 14.1175 6.9675 14.1175L0.0587508 14.1325ZM3.59375 15.4763C3.535 15.4763 3.52 15.4325 3.55 15.3888L3.75375 15.0238C3.7825 14.98 3.84125 14.9363 3.9 14.9363H6.82125C6.88 14.9363 6.90875 14.98 6.90875 15.0388L6.88 15.3888C6.88 15.4475 6.82125 15.4913 6.7775 15.4913L3.59375 15.4763ZM18.755 12.5263C17.835 12.76 17.2062 12.935 16.3012 13.1688C16.0812 13.2263 16.0675 13.2413 15.8762 13.0225C15.6587 12.7738 15.4975 12.6138 15.1912 12.4675C14.27 12.015 13.3787 12.1463 12.5475 12.6863C11.5537 13.3288 11.0425 14.2788 11.0575 15.4613C11.0712 16.63 11.875 17.5938 13.0287 17.755C14.0225 17.8863 14.8537 17.5363 15.5125 16.7925C15.6437 16.63 15.76 16.455 15.9062 16.25H13.0875C12.7812 16.25 12.7075 16.06 12.81 15.8125C13 15.36 13.35 14.6 13.555 14.22C13.5863 14.1496 13.6376 14.0899 13.7024 14.0484C13.7673 14.0068 13.843 13.9852 13.92 13.9863H19.2362C19.2075 14.3813 19.2075 14.775 19.1487 15.17C18.9974 16.2099 18.5855 17.1946 17.9512 18.0325C16.9 19.42 15.5262 20.2825 13.7887 20.515C12.3575 20.705 11.0275 20.4275 9.86 19.5525C8.77875 18.7338 8.165 17.6525 8.005 16.3088C7.815 14.7163 8.2825 13.285 9.24625 12.0288C10.2837 10.6713 11.6562 9.80875 13.3362 9.50375C14.7087 9.25375 16.0237 9.41625 17.2062 10.2175C17.9812 10.73 18.535 11.43 18.9012 12.2775C18.9887 12.4088 18.93 12.4825 18.755 12.5275V12.5263ZM23.59 20.6038C22.26 20.5738 21.0475 20.1938 20.025 19.3175C19.1744 18.6006 18.6137 17.5987 18.4475 16.4988C18.185 14.8488 18.6375 13.3875 19.6312 12.0875C20.6975 10.685 21.9825 9.955 23.7212 9.65C25.2112 9.3875 26.6137 9.53125 27.8837 10.3938C29.0375 11.1813 29.7537 12.2488 29.9437 13.65C30.1912 15.6225 29.6225 17.2288 28.2637 18.6025C27.3 19.5813 26.1162 20.1938 24.7575 20.4713C24.3637 20.5463 23.97 20.5588 23.59 20.6038V20.6038ZM27.065 14.7038C27.0512 14.5125 27.0512 14.3663 27.0225 14.22C26.76 12.7738 25.43 11.9575 24.0425 12.2775C22.6837 12.5838 21.8075 13.4463 21.4862 14.8188C21.2237 15.9588 21.7787 17.1125 22.83 17.5813C23.6337 17.9313 24.4363 17.8863 25.2113 17.4938C26.365 16.8938 26.9925 15.9588 27.0662 14.7025L27.065 14.7038Z"
      fill="currentColor"
    />
  ),
  defaultProps: {
    width: '24px !important',
    height: '24px !important',
  },
});

export const Apollo = createIcon({
  viewBox: '0 0 24 24',
  path: (
    <path
      d="M12,0C5.372,0 0,5.373 0,12 0,18.628 5.372,24 12,24 18.627,24 24,18.628 24,12A12.014,12.014 0 0 0 23.527,8.657 0.6,0.6 0 0 0 22.4,9.066H22.398C22.663,10.009 22.8,10.994 22.8,12A10.73,10.73 0 0 1 19.637,19.637 10.729,10.729 0 0 1 12,22.8 10.73,10.73 0 0 1 4.363,19.637 10.728,10.728 0 0 1 1.2,12 10.73,10.73 0 0 1 4.363,4.363 10.728,10.728 0 0 1 12,1.2C14.576,1.2 17.013,2.096 18.958,3.74A1.466,1.466 0 1 0 19.82,2.9 11.953,11.953 0 0 0 12,0ZM10.56,5.88 6.36,16.782H8.99L9.677,14.934H13.646L12.927,12.892H10.314L12.014,8.201 15.038,16.781H17.669L13.47,5.88Z"
      fill="currentColor"
    />
  ),
});

export const SingleSPA = createIcon({
  viewBox: '0 0 24 24',
  path: (
    <path
      d="M13.2 1.26C17.82 1.83 21.516 5.16 22.524 9.666C23.274 13.032 22.362 16.536 20.052 19.17C17.976 21.54 14.712 22.926 11.55 22.776C8.80199 22.65 6.35999 21.588 4.43399 19.68C2.78999 18.054 1.75199 16.092 1.34399 13.83C1.18799 12.978 1.18799 11.01 1.34399 10.17C2.17799 5.592 5.67599 2.124 10.26 1.338C10.89 1.236 12.594 1.188 13.2 1.26ZM7.91999 6.474C7.91999 6.504 8.17799 6.96 8.50199 7.482C8.81999 8.004 9.49199 9.108 9.98999 9.936L10.908 11.442L9.60599 12.27C8.17799 13.182 8.09999 13.242 8.09999 13.362C8.09999 13.404 8.53199 14.058 9.05999 14.808L10.014 16.176L12.066 17.244C13.284 17.88 14.13 18.294 14.166 18.258C14.196 18.228 13.83 17.568 13.26 16.626C12.732 15.756 12.3 15.036 12.3 15.024C12.3 15.012 13.326 14.484 14.58 13.86C15.84 13.23 16.878 12.678 16.896 12.636C16.926 12.552 15.858 8.406 15.786 8.328C15.732 8.268 8.30399 6.438 8.08199 6.426C7.99199 6.426 7.91999 6.444 7.91999 6.474Z"
      fill="currentColor"
    />
  ),
});
export const GCP = createIcon({
  viewBox: '0 0 24 24',
  path: (
    <path d="M12.19 2.38a9.344 9.344 0 0 0-9.234 6.893c.053-.02-.055.013 0 0-3.875 2.551-3.922 8.11-.247 10.941l.006-.007-.007.03a6.717 6.717 0 0 0 4.077 1.356h5.173l.03.03h5.192c6.687.053 9.376-8.605 3.835-12.35a9.365 9.365 0 0 0-2.821-4.552l-.043.043.006-.05A9.344 9.344 0 0 0 12.19 2.38zm-.358 4.146c1.244-.04 2.518.368 3.486 1.15a5.186 5.186 0 0 1 1.862 4.078v.518c3.53-.07 3.53 5.262 0 5.193h-5.193l-.008.009v-.04H6.785a2.59 2.59 0 0 1-1.067-.23h.001a2.597 2.597 0 1 1 3.437-3.437l3.013-3.012A6.747 6.747 0 0 0 8.11 8.24c.018-.01.04-.026.054-.023a5.186 5.186 0 0 1 3.67-1.69z" />
  ),
});
