import React from "react";
import { shallow } from "enzyme";
import ProfileDialog from "./profileDialog";

describe("ProfileDialog", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<ProfileDialog />);
    expect(wrapper).toMatchSnapshot();
  });
});
