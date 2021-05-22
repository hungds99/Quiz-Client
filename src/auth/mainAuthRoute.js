import { Redirect, Route } from "react-router";
import { RoutePath } from "../configs";
import MainLayout from "../layouts/mainLayout/mainLayout";
import { isAuthenticated } from "./authChecker";

// Kiểm tra đăng nhập
export const MainAuthRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <MainLayout>
            <Component {...props} />
          </MainLayout>
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
