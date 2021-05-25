import React from "react";
import { shallow } from "enzyme";
import NotFound from "./notFound";

describe("NotFound", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper).toMatchSnapshot();
  });
});
