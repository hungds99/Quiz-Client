import { Redirect, Route } from "react-router";
import { RoutePath } from "../configs";
import { isAuthenticated } from "./authChecker";

// Kiểm tra đăng nhập
export const AuthRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <Component {...props} />
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
