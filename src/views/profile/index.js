// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "molecules/DashboardLayout";
import DashboardNavbar from "molecules/DashboardNavbar";
import Footer from "molecules/Footer";

import Header from "views/profile/components/Header";

function Profile() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header />
      <Footer />
    </DashboardLayout>
  );
}

export default Profile;
