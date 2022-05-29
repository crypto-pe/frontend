import { Employer } from "components/Dashboards/Employer";
import { Employee } from "components/Dashboards/Employee";
import { DashboardLayout } from "layouts/dashboard.layout";
import { NextPage } from "next";
import { EmployeeData } from "types/EmployeeData";
import { useEffect } from "react";
import Client from "utils/client";
import Store from "utils/store";
import { GetAccountReturn, GetAllOrganizationsReturn } from "utils/api.gen";

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

let isAdmin;

const setStateData = async () => {
  const account: GetAccountReturn = await Client.getAccount({
    address: Store.getState().address
  });
  Store.setState({ ...Store.getState(), account: account.account });

  const authHeaders = { Bearer: Store.getState().jwtToken };

  const organizations: GetAllOrganizationsReturn =
    await Client.getAllOrganizations(authHeaders);
  Store.setState({
    ...Store.getState(),
    organizations: organizations.organizations
  });
  Store.setState({
    ...Store.getState(),
    selectedOrganization: organizations.organizations[0].id
  });
};

const setAdminData = async () => {
  const orgMember = await Client.getOrganizationMember({
    organizationID: Store.getState().selectedOrganization,
    memberAddress: Store.getState().address
  });
  isAdmin = orgMember.organizationMember.isAdmin;
};

const Dashboard: NextPage = () => {
  useEffect(() => {
    setStateData();
    setAdminData();
  }, []);

  return (
    <DashboardLayout>
      {isAdmin ? (
        <Employer employeeData={employeeData} />
      ) : (
        <Employee employeeData={employeeData} />
      )}
      <Employer employeeData={employeeData} />
    </DashboardLayout>
  );
};

export default Dashboard;
