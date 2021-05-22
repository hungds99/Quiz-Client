import React from "react";
import { shallow } from "enzyme";
import DashboardLayout from "./dashboardLayout";

describe("DashboardLayout", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<DashboardLayout />);
    expect(wrapper).toMatchSnapshot();
  });
});
