import React from "react";
import { shallow } from "enzyme";
import Profile from "./profile";

describe("Profile", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Profile />);
    expect(wrapper).toMatchSnapshot();
  });
});
