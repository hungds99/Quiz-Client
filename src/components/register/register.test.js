import React from "react";
import { shallow } from "enzyme";
import Register from "./register";

describe("Register", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Register />);
    expect(wrapper).toMatchSnapshot();
  });
});
