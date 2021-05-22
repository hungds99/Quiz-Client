import React from "react";
import { shallow } from "enzyme";
import MainLayout from "./mainLayout";

describe("MainLayout", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<MainLayout />);
    expect(wrapper).toMatchSnapshot();
  });
});
