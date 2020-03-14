const initialStateIndex = {
  sideBar: {
    controlPanel: {
      title: 'Controls',
      sliderArray: [{ label: 'Cell Size' }, { label: 'Mark Size' }],
      toggleArray: [{ label: 'Dark Mode' }]
    }
  },
  map: {
    viewState: {
      longitude: -121.740517,
      latitude: 38.544907,
      zoom: 13,
      pitch: 45,
      bearing: 30
    }
  }
};

export default initialStateIndex;
