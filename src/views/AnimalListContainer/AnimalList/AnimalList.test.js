import React from "react";
import { shallow } from "enzyme";
import AnimalList from "./AnimalList";
import { AnimalsGrid, AnimalsToolbar, AnimalsPagination } from './components';

describe("AnimalList", () => {
  let wrapperEmpty;
  let wrapperWithElements;
  const user = {'email' : 'someEmail'};
  let data =  {"data":{"count":1,"next":null,"previous":null, "results":[{"id":2,"name":"Ethel","description":"Es muy vago y duerme todo el día","status_request":"Disponible","specie":"Gato","race":"Dos dedos","gender":"Macho","owner":null}]},"status":200,"statusText":"OK","headers": {}}
  const emptyData = {"data":{"count":0,"next":null,"previous":null, "results":[]},"status":200,"statusText":"OK","headers": {}}
  let props = {
    user: user,
    initialSearch: jest.fn('','','').mockResolvedValue(emptyData)
  };
  let useEffect;

  const mockUseEffect = () => {
    useEffect.mockImplementationOnce(f => f());
  };

  beforeEach(() => {
    useEffect = jest.spyOn(React, "useEffect");
    mockUseEffect();
    mockUseEffect();
    wrapperEmpty = shallow(<AnimalList {...props} />);
    props = {
      user: user,
      initialSearch: jest.fn('','','').mockResolvedValue(data)
    };
    wrapperWithElements = shallow(<AnimalList {...props} />);
  });

  describe("on start", () => {

    it("got empty response", () => {
      expect(props.initialSearch).toHaveBeenCalled();
      expect(wrapperEmpty.text().includes('Por favor intente buscar nuevamente')).toBeTruthy
    });

    it("got response with elements", () => {
      expect(props.initialSearch).toHaveBeenCalled();
      expect(wrapperWithElements.text().includes('Por favor intente buscar nuevamente')).toBeFalsy
      expect(wrapperWithElements.find(AnimalsGrid)).toHaveLength(1);
      expect(wrapperWithElements.find(AnimalsPagination)).toHaveLength(1);
    });

  });
});