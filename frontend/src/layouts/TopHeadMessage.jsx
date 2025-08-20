import { cn } from "@/utils/functions";

export default function TopHeadMessage() {
  return (
    <>
      <div
        className={cn(
          "absolute top-0 left-0 w-full z-50 py-[1px] flex justify-center items-center gap-4 bg-[#D8F5FA] h-8"
        )}
      >
        <span>You are using demo version</span>

        <a
          href='https://point.omega.ac'
          target='_self'
          className='bg-primary text-white px-2 rounded-md'
        >
          Buy now
        </a>
      </div>
    </>
  );
}
