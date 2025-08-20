import React, { Fragment } from "react";
import {
  DollarOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
  UsergroupDeleteOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";

import { Card, Statistic } from "antd";

const HRMDashboardCard = ({ information }) => {
  return (
    <Fragment>
      <section className="mt-5 mb-5">
        <div className="site-statistic-demo-card ">
          <div className="grid 2xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3  gap-5 max-w-7xl mx-auto py-4">
            <div>
              <Card
                className="ant-shadow txt-color-2 text-center bg-[#a8f7dc4f]"
                bordered={false}>
                <Statistic
                  title={
                    <p className="text-xl text-[#10b981] txt-color-2">
                      {" "}
                      TOTAL USERS{" "}
                    </p>
                  }
                  loading={!information}
                  value={information?.totalUsers}
                  valueStyle={{
                    color: "#10b981",
                  }}
                  prefix={
                    <TeamOutlined
                      className="mr-4"
                      style={{ fontSize: "35px" }}
                    />
                  }
                />
              </Card>
            </div>
            <div>
              <Card
                className="ant-shadow txt-color-2 text-center bg-[#b1acf844]"
                bordered={false}>
                <Statistic
                  title={
                    <p className="text-xl text-[#4f46e5]  txt-color-2">
                      TOTAL SALARY
                    </p>
                  }
                  loading={!information}
                  value={information?.totalSalary || 0}
                  precision={2}
                  valueStyle={{
                    color: "#4f46e5",
                  }}
                  prefix={
                    <DollarOutlined
                      className="mr-4"
                      style={{ fontSize: "35px" }}
                    />
                  }
                />
              </Card>
            </div>

            <div>
              <Card
                className="ant-shadow txt-color-2 text-center bg-[#aae6f552]"
                bordered={false}>
                <Statistic
                  title={
                    <p className="text-xl text-[#0891b2] txt-color-2">
                      {" "}
                      TODAY PRESENT{" "}
                    </p>
                  }
                  loading={!information}
                  value={information?.todayPresent}
                  valueStyle={{
                    color: "#0891b2",
                  }}
                  prefix={
                    <UsergroupAddOutlined
                      className="mr-4"
                      style={{ fontSize: "35px" }}
                    />
                  }
                />
              </Card>
            </div>
            <div>
              <Card
                className="ant-shadow txt-color-2 text-center bg-[#d0a9f569]"
                bordered={false}>
                <Statistic
                  title={
                    <p className="text-xl text-[#a855f7] txt-color-2">
                      TODAY ON LEAVE
                    </p>
                  }
                  loading={!information}
                  value={information?.todayOnLeave}
                  valueStyle={{
                    color: "#a855f7",
                  }}
                  prefix={
                    <UserSwitchOutlined
                      className="mr-4"
                      style={{ fontSize: "35px" }}
                    />
                  }
                />
              </Card>
            </div>

            <div>
              <Card
                className="ant-shadow txt-color-2 text-center bg-[#fa8fa154]"
                bordered={false}>
                <Statistic
                  title={
                    <p className="text-xl text-center text-[#f43f5e] txt-color-2">
                      {" "}
                      TODAY ABSENT
                    </p>
                  }
                  loading={!information}
                  value={information?.todayAbsent}
                  valueStyle={{
                    color: "#f43f5e",
                  }}
                  prefix={
                    <UsergroupDeleteOutlined
                      className="mr-4"
                      style={{ fontSize: "35px" }}
                    />
                  }
                />
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default HRMDashboardCard;
