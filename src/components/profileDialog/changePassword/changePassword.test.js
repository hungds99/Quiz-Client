import React from "react";
import { shallow } from "enzyme";
import ChangePassword from "./changePassword";

describe("ChangePassword", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<ChangePassword />);
    expect(wrapper).toMatchSnapshot();
  });
});
