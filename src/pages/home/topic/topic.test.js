import React from "react";
import { shallow } from "enzyme";
import Topic from "./topic";

describe("Topic", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Topic />);
    expect(wrapper).toMatchSnapshot();
  });
});
