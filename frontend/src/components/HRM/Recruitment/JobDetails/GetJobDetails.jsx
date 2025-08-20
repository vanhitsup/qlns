import { loadSingleJob } from "@/redux/rtk/features/hrm/job/jobSlice";
import { Button } from "antd";
import { Header } from "antd/es/layout/layout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import bannerImage from "../../../../assets/images/recruitmentBanner.jpg";
import LeftCard from "./LeftCard";
import RightCard from "./RightCard";

const GetJobDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { job: jobData, loading } = useSelector((state) => state.job);
  useEffect(() => {
    dispatch(loadSingleJob(id));
  }, [dispatch, id]);
  return (
    <>
      <div
        className='relative bg-blend-overlay h-[200px] bg-fit bg-no-repeat'
        style={{ backgroundImage: `url(${bannerImage})` }}
      >
        <div className='absolute inset-0 bg-black bg-opacity-30'></div>
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
        <div className='text-white font-bold text-2xl absolute top-2/4 w-full text-center uppercase'>
          Career opportunity
        </div>
      </div>
      <div className='my-12 mx-12'>
        <div className='text-zinc-600 text-center mx-auto text-3xl font-bold w-1/3 my-12'>
          <div className='my-2 w-2/3 mx-auto'>
            <hr className='border-zinc-200' />
            <hr className='border-zinc-200' />
            <hr className='border-zinc-200' />
          </div>
          <h2 className=''>Job Information</h2>
          <div className='my-2 w-2/3 mx-auto'>
            <hr className='border-zinc-200' />
            <hr className='border-zinc-200' />
            <hr className='border-zinc-200' />
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-8'>
          {jobData && !loading && (
            <>
              <LeftCard data={jobData} />
              <RightCard data={jobData} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default GetJobDetails;
