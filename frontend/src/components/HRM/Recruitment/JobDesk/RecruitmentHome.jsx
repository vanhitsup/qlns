import { Header } from "antd/es/layout/layout";
import { useEffect } from "react";
import { Link } from "react-router-dom";
// import RecruitmentHomeBanner from "../recruitmentLayout/RecruitmentHomeBanner";
import { loadAllJob } from "@/redux/rtk/features/hrm/job/jobSlice";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import bannerImage from "../../../../assets/images/recruitmentBanner.jpg";
import JobCard from "./JobCard";
const RecruitmentHome = () => {
  const dispatch = useDispatch();
  const { list: data, loading } = useSelector((state) => state.job);

  useEffect(() => {
    dispatch(loadAllJob());
  }, [dispatch]);
  return (
    <div className='max-w-[1400px] mx-auto'>
      <div
        className='relative overflow-hidden bg-blend-overlay h-[250px] sm:h-[400px] md:h-[520px] lg:h-[600px] bg-cover bg-center bg-no-repeat object-fill object-center '
        style={{ backgroundImage: `url(${bannerImage})` }}
      >
        <div className='absolute overflow-hidden inset-0 bg-black bg-opacity-30'></div>
        <Header>
          <div className='flex items-center content-center justify-between py-8 px-12'>
            <div className='z-50'>
              <h2 className='text-white text-center mt-2 mb-1 font-bold text-[30px] lg:text-[35px]'>
                HRM
                <strong
                  style={{
                    color: "#6ECCAF	",
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  OS
                </strong>
              </h2>
            </div>
            <div>
              <Link to='/recruitment'>
                <Button
                  type='default'
                  size={`large`}
                  className='font-semibold bg-green-700 text-white border-none hover:bg-green-600'
                >
                  HOME
                </Button>
              </Link>
            </div>
          </div>
        </Header>
      </div>

      {/* all the job here */}
      <div className='my-12 mx-12'>
        <div className='text-zinc-600 text-center mx-auto text-3xl font-bold w-1/3 my-12'>
          <div className='my-2 w-2/3 mx-auto'>
            <hr className='border-zinc-200' />
            <hr className='border-zinc-200' />
            <hr className='border-zinc-200' />
          </div>
          <h2 className=''>Opening Jobs</h2>
          <div className='my-2 w-2/3 mx-auto'>
            <hr className='border-zinc-200' />
            <hr className='border-zinc-200' />
            <hr className='border-zinc-200' />
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {data &&
            !loading &&
            data.map((item) => (
              <Link key={item.id} to={`/recruitment/${item?.id}`}>
                <JobCard data={item} />
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default RecruitmentHome;
