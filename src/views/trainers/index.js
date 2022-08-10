/* eslint-disable react/function-component-definition */

import { useState, useEffect } from "react";

// Material Dashboard 2 React components
import CardUser from "components/CardUser";

// Material Dashboard 2 React example components
import DashboardLayout from "molecules/DashboardLayout";
import DashboardNavbar from "molecules/DashboardNavbar";

// @mui material components
import Stack from "@mui/material/Stack";

import { getCookie, getTeachersAndCoachs } from "api";

function Trainers() {
  const [users, setUsers] = useState([]);
  const token = getCookie("askoacademy-token");

  const getPerson = async () => {
    const res = await getTeachersAndCoachs(token);
    if (res.success) {
      setUsers([...res.data]);
    }
  };

  useEffect(() => {
    // Fetch details onces
    getPerson();
    return () => null;
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Stack direction="row" spacing={3}>
        {users.map((user) => (
          <CardUser
            key={user?.id}
            name={user?.name}
            description={user?.description}
            type={user?.user_type}
          />
        ))}
      </Stack>
    </DashboardLayout>
  );
}

export default Trainers;
