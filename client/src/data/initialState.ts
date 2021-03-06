const initialStateIndex = {
  sideBar: {
    controlPanel: {
      title: 'Controls',
      sliderArray: [
        { label: 'Cell Size' },
        { label: 'Mark Size' },
        { label: 'Height' }
      ],
      toggleArray: [
        { label: 'Dark Mode' },
        { label: 'Scatter' },
        { label: 'Edge' },
        { label: 'Bubble' }
      ]
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
