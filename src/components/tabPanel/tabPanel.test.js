import React from "react";
import { shallow } from "enzyme";
import TabPanel from "./tabPanel";

describe("TabPanel", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<TabPanel />);
    expect(wrapper).toMatchSnapshot();
  });
});
