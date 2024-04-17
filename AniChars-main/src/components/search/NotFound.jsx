import { HiMiniXMark } from "react-icons/hi2";

function NotFound({ handleClose }) {
  return (
    <div className="relative">
      <div className="absolute right-0 flex justify-between">
        <HiMiniXMark
          className="cursor-pointer text-3xl text-white"
          onClick={handleClose}
        />
      </div>
      <h1 className="absolute right-1/2 top-5 translate-x-[50%] whitespace-nowrap text-center font-nova-square text-5xl font-semibold uppercase text-indigo-800">
        no results!
      </h1>
      <img
        className="rounded-lg"
        src="https://static.vecteezy.com/system/resources/previews/027/989/604/original/octopuses-underwater-bubbles-error-404-flash-message-chibi-sea-creatures-website-landing-page-ui-design-not-found-cartoon-image-cute-vibes-flat-illustration-with-kawaii-anime-background-vector.jpg"
      />
    </div>
  );
}

export default NotFound;
