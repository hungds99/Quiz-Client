import React from "react";
import { shallow } from "enzyme";
import NavItem from "./navItem";

describe("NavItem", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<NavItem />);
    expect(wrapper).toMatchSnapshot();
  });
});
