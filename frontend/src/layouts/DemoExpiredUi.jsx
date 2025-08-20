import { FaPhoneAlt } from "react-icons/fa";

export default function DemoExpiredUi() {
  return (
    <div className='flex h-screen w-full flex-col items-center justify-center bg-gray-100 px-4 dark:bg-gray-900'>
      <div className='mx-auto max-w-md space-y-6 text-center'>
        <div className='space-y-2'>
          <h1 className='text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl'>
            Demo Time Expired
          </h1>
          <p className='text-lg text-gray-500 dark:text-gray-400'>
            Your demo session has come to an end. To continue exploring our
            platform, contact our sales team.
          </p>
        </div>
        <div className='flex item-center justify-center gap-4 sm:flex-row'>
          <a
            className='inline-flex h-10 items-center justify-center  gap-2 rounded-md border border-gray-200  bg-white px-6 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 '
            href='tel:+8801820215555'
          >
            <FaPhoneAlt className='text-blue-500' /> Contact Sales
          </a>
        </div>
      </div>
    </div>
  );
}
