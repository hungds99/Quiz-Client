import React from "react";
import { shallow } from "enzyme";
import Answer from "./answer";

describe("Answer", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Answer />);
    expect(wrapper).toMatchSnapshot();
  });
});
