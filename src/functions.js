import { getAddress } from "./api/map";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

// store data of marked location
export const onDragEnd = (draggableMarker, setLng, setLat, setAddress) => {
  // set state to marker coords
  const lngLat = draggableMarker.getLngLat();
  setLng(lngLat.lng);
  setLat(lngLat.lat);
  // setZoom(map.current.getZoom().toFixed(2)) ?

  getAddress(lngLat.lng, lngLat.lat)
    .then((res) => {
      console.log(res.data.features[0].text, draggableMarker);
      setAddress(res.data.features[0].text);
    })
    .catch(() =>
      setAddress("Ooops, that is the ocean! Pick somewhere on land.")
    );
};

// keep draggable marker on center of map
export const centerDraggableMarker = (map, draggableMarker) => {
  draggableMarker.setLngLat([map.getCenter().lng, map.getCenter().lat]);
};

export const popup = (_id, location, description) => {
  new mapboxgl.Popup({ offset: 25 }).setHTML(
    `
                <div data-id="${_id}">
                <h4>${location}</h4>
                <h6>${description}</h6>
                </div>
                `
  );
};
