
import Card from '@/UI/Card';
import List from '@/UI/List';
import CreateDrawer from '@/components/CommonUi/CreateDrawer';
import Loader from '@/components/Loader/Loader';
import { loadSingleJobInterview } from '@/redux/rtk/features/hrm/jobInterview/jobInterviewSlice';
import { Tag } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import ReviewInterview from './ReviewInterview';

export default function DetailsJobInterview() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const {jobInterview} = useSelector(state=> state.jobInterview);
    useEffect(()=>{
        dispatch(loadSingleJobInterview(id))
    },[dispatch, id])
  return (
    <>
    {jobInterview ? <Card 
    title={`Job Interview - (No:${jobInterview.id})`} 
    extra={<>
        <CreateDrawer
            permission={"readSingle-jobApplication"}
            title={"Applicant CV or Resume"}
            width={82}
            color={"bg-rose-500"}
            icon={false}
        >
             <div>
                <embed
                    src={jobInterview.jobApplication.cvUrl}
                    type="application/pdf"
                    width="100%"
                    height="600px"
                />
            </div>
        </CreateDrawer>
        <CreateDrawer
          permission={"create-jobApplication"}
          title={"Review Interview"}
          icon={false}
          width={35}
        >
            <ReviewInterview data={jobInterview} />
        </CreateDrawer>

       
    </>}
    >
      <div className='flex gap-5 md:gap-10 p-5'>
      <List className="w-full" list={[
            {
                label: "Interview Date",
                value: dayjs(jobInterview?.scheduleDate).format("DD/MM/YYYY"),
            },
            {
                label: "Interview Time",
                value: dayjs(jobInterview?.scheduleTime).format("HH:mm:ss"),
            },
            {
                label: "Applied For",
                value: jobInterview.jobApplication.job.jobTitle,
            },
            {
                label: "Interview Status",
                value: <Tag color={jobInterview.interviewStatus ==="PENDING" ?"orange":"green"}>{jobInterview.interviewStatus}</Tag>,
            },
           

        ]}/>
          <List className="w-full" list={[
            {
                label: "Candidate Name",
                value: jobInterview.jobApplication.name,
            },
            {
                label: "Applied Date",
                value: dayjs(jobInterview.createdAt).format("DD/MM/YYYY"),
            },
            {
                label: "Email",
                value: jobInterview.jobApplication.email,
            },
            {
                label: "Phone",
                value: jobInterview.jobApplication.phone,
            },
           

        ]}/>
      </div>
      <hr />
      <div className='p-5'>
        <h1 className='font-semibold text-lg mb-2'>Assigned Member for taking Interview</h1>
        <p>{jobInterview.jobInterviewMember.map(user => <Tag className='p-3 my-2' color='blue' key={user.id}>
            <h1 className='font-medium text-md uppercase'>Interviewer: {user.user.username}</h1>
            <p>Email: {user.user.email ? user.user.email : "N/A"}</p>
            <p>Phone: {user.user.phone ? user.user.phone : "N/A"}</p>
        </Tag>)}</p>
      </div>
    </Card>
    :
    <Loader/>}
    </>
  )
}
