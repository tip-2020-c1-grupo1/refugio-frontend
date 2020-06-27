import React from "react";
import { shallow, mount } from "enzyme";
import { createShallow } from '@material-ui/core/test-utils';
import AnimalList from "./AnimalList";

describe("AnimalList", () => {
  let props;
  let wrapper;
  let useEffect;

  const posts =  {"data":{"count":5,"next":null,"previous":null,
  "results":[{"id":2,"name":"Ethel","description":"Es muy vago y duerme todo el día","status_request":"Disponible","specie":"Gato","race":"Dos dedos","gender":"Macho","owner":null}]},"status":200,"statusText":"OK","headers": {}}
  const user = {'email' : 'someEmail'};

  beforeEach(() => {
    useEffect = jest.spyOn(React, "useEffect").mockImplementation(f => f());

    props = {
      user: user,
      initialSearch: jest.fn('','','').mockResolvedValue(posts)
    };

    wrapper = shallow(<AnimalList {...props} />);
  });

  describe("on start", () => {

    it("does load posts", () => {
      expect(props.initialSearch).toHaveBeenCalled();
    });

    it("renders the authors", () => {
      wrapper.debug();
      expect(wrapper.find("Author")).toHaveLength(2);

      const firstAuthor = wrapper.find("Author").first();

      expect(firstAuthor.prop("author")).toEqual(alice);
      expect(firstAuthor.prop("activeAuthor")).toEqual(null);
    });
  });
});