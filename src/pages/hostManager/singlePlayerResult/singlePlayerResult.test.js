import React from "react";
import { shallow } from "enzyme";
import SinglePlayerResult from "./singlePlayerResult";

describe("SinglePlayerResult", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<SinglePlayerResult />);
    expect(wrapper).toMatchSnapshot();
  });
});
