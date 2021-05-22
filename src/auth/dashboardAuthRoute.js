import { Redirect, Route } from "react-router";
import { RoutePath } from "../configs";
import DashboardLayout from "../layouts/dashboardLayout/dashboardLayout";
import { isAuthenticated } from "./authChecker";

// Kiểm tra đăng nhập
export const DashboardAuthRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <DashboardLayout>
            <Component {...props} />
          </DashboardLayout>
        ) : (
          <Redirect
            to={{
              pathname: `${RoutePath.login}`,
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};
