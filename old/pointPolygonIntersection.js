function pointPolygonIntersection(point, polygon){
  //https://www.nttpc.co.jp/technology/number_algorithm.html
  let count = 0;
  const len = polygon.length;
  for (let i=0; i < len-1; i++){
    const pol0 = polygon[i], pol1 = polygon[i+1];
    if( ((pol0[1] <= point[1]) && (pol1[1] > point[1])) || ((pol0[1] > point[1]) && (pol1[1] <= point[1])) ){
      const vt = (point[1] - pol0[1]) / (pol1[1] - pol0[1]);
      if (point[0] < (pol0[0] + (vt * (pol1[0] - pol0[0])))){
        count++;
      }
    }
  }
  return !!(count % 2);
}

function geo_pointPolygonIntersection(point, feature){
  const geometry = feature.geometry;
  const coordinates = [];
  if(!geometry || geometry.coordinates) return false;
  if(geometry.type=="MultiPolygon"){
    coordinates.push(...geometry.coordinates);
  }
  else if(geometry.type=="Polygon"){
    coordinates.push(geometry.coordinates);
  }
  else{
    return false;
  }
  loop: for (let j=0; j < coordinates.length; j++){
    const coordinate = coordinates[j];
    if(pointPolygonIntersection(point, coordinate[0])){
      for(let i=1; i < coordinate.length; i++){
        if(pointPolygonIntersection(point, coordinate[i])){
          continue loop;
        }
      }
      return true;
    }
  }
  return false;
}