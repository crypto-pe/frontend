import { Employer } from "components/Dashboards/Employer";
import { Employee } from "components/Dashboards/Employee";
import { DashboardLayout } from "layouts/dashboard.layout";
import { NextPage } from "next";
import { EmployeeData } from "types/EmployeeData";
import { useEffect } from "react";
import Client from "utils/client";
import Store from "utils/store";
import { GetAccountReturn, GetAllOrganizationsReturn } from "utils/api.gen";
import { useLocalStorage } from "utils/useLocalstorage";
import client from "utils/client";
import { useOrgnizationsStore } from "store/organizations";

const employeeData: EmployeeData[] = [
  {
    name: "Saptarshi Babu",
    role: "Chutiya",
    salary: -69
  },
  {
    name: "Sala Milind",
    role: "Gaand Engineer",
    salary: 36
  },
  {
    name: "Sharma Ji Ka Beta",
    role: "Engineer",
    salary: 420
  }
];

const Dashboard: NextPage = () => {
  const { setCurrentOrgId } = useOrgnizationsStore();
  return (
    <DashboardLayout>
      {/* {true ? (
        <Employer employeeData={employeeData} />
      ) : (
        <Employee employeeData={employeeData} />
      )}
      <Employer employeeData={employeeData} /> */}
    </DashboardLayout>
  );
};

export default Dashboard;
