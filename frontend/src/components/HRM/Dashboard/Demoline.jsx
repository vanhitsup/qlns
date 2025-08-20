/* eslint-disable no-unsafe-optional-chaining */
import { Line } from "@ant-design/plots";
import { Card, Col, DatePicker, Row } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import Loader from "@/components/Loader/Loader";
import { loadCRMDashboardData, loadHRMDashboardData } from "@/redux/rtk/features/dashboard/dashboardSlice";
import HRMDashboardCard from "@/components/HRM/Dashboard/Card";
import dayjs from "dayjs";

const DemoLine = () => {
  const dispatch = useDispatch();
  const [pageConfig, setPageConfig] = useState({
    startDate: dayjs(new Date()).startOf("month").format("YYYY-MM-DD"),
    endDate: dayjs(new Date()).endOf("month").format("YYYY-MM-DD"),
  });
  const { hrmInfo: data } = useSelector((state) => state.dashboard);
  const { RangePicker } = DatePicker;

  const onCalendarChange = (dates) => {
    const startDate = (dates?.[0]).format("YYYY-MM-DD");
    const endDate = (dates?.[1]).format("YYYY-MM-DD");
    setPageConfig((prev) => {
      return { ...prev, startDate, endDate };
    });
  };
  useEffect(() => {
    dispatch(loadHRMDashboardData(pageConfig));

  }, [dispatch, pageConfig]);

  const config = {
    data: data?.workHoursByDate,
    xField: "date",
    yField: "time",
    seriesField: "type",
    yAxis: {
      label: {
        formatter: (v) => `${v / 1000} Hours`,
      },
    },
    legend: {
      position: "top",
    },
    smooth: true,
    animation: {
      appear: {
        animation: "path-in",
        duration: 5000,
      },
    },
  };

  return (
    <Fragment>
      <UserPrivateComponent permission={"readAll-dashboard"}>
        <Row gutter={[30, 30]} justify={"space-between"}>
          <Col sm={24} md={24} lg={12} span={24} className="mb-auto">
            <RangePicker
              onCalendarChange={onCalendarChange}
              defaultValue={[dayjs().startOf("month"), dayjs().endOf("month")]}
              className="range-picker"
              style={{ maxWidth: "25rem" }}
            />
          </Col>
          <Col sm={24} md={24} lg={12} span={24}>
            <div className="text-end mr-4">{/*<AttendancePopup />*/}</div>
          </Col>
        </Row>

        <HRMDashboardCard information={data} />

        <Card title="WORK HOURS ">
          {data ? <Line {...config} /> : <Loader />}
        </Card>
      </UserPrivateComponent>
    </Fragment>
  );
};

export default DemoLine;
