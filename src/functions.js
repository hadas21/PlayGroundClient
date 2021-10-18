

// store data of marked location
   export const onDragEnd = (e) => {
      // set state to marker coords
      const lngLat = marker.getLngLat()
      setLng(lngLat.lng)
      setLat(lngLat.lat)
      // setZoom(map.current.getZoom().toFixed(2)) ?

      