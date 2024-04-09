const degreesToRadians = (degrees) => {
	const pi = Math.PI;
	return degrees * (pi / 180);
  };
  
  const radiansToDegrees = (radians) => {
	const pi = Math.PI;
	return radians * (180 / pi);
  };
  
  const wrap = (n, min, max) => {
	return n >= min && n < max ? n : mod(n - min, max - min) + min;
  };
  
  const mod = (x, m) => {
	return ((x % m) + m) % m;
  };
  
  const EARTH_RADIUS = 6371009;
  
  const computeDistance = (startLocation, endLocation) => {
	const computeDistanceRadians = (lat1, lng1, lat2, lng2) => {
	  const hav = (num) => {
		const sinHalf = Math.sin(num * 0.5);
		return sinHalf * sinHalf;
	  };
  
	  const arcHav = (num) => {
		return 2 * Math.asin(Math.sqrt(num));
	  };
  
	  const havDistance = (lat1, lat2, dLng) => {
		return hav(lat1 - lat2) + hav(dLng) * Math.cos(lat1) * Math.cos(lat2);
	  };
  
	  return arcHav(havDistance(lat1, lat2, lng1 - lng2));
	};
  
	const computeAngleBetween = (startLocation, endLocation) => {
	  return computeDistanceRadians(
		degreesToRadians(startLocation.latitude),
		degreesToRadians(startLocation.longitude),
		degreesToRadians(endLocation.latitude),
		degreesToRadians(endLocation.longitude)
	  );
	};
  
	return computeAngleBetween(startLocation, endLocation) * EARTH_RADIUS;
  };
  
  const computeHeading = (startLocation, endLocation) => {
	const fromLat = degreesToRadians(startLocation.latitude);
	const fromLng = degreesToRadians(startLocation.longitude);
	const toLat = degreesToRadians(endLocation.latitude);
	const toLng = degreesToRadians(endLocation.longitude);
	const dLng = toLng - fromLng;
	const heading = Math.atan2(
	  Math.sin(dLng) * Math.cos(toLat),
	  Math.cos(fromLat) * Math.sin(toLat) - Math.sin(fromLat) * Math.cos(toLat) * Math.cos(dLng)
	);
  
	return wrap(radiansToDegrees(heading), -180, 180);
  };
  
  const computeOffset = (startLocation, distance, heading) => {
	const d = distance / EARTH_RADIUS;
	const h = degreesToRadians(heading);
	const fromLat = degreesToRadians(startLocation.latitude);
	const fromLng = degreesToRadians(startLocation.longitude);
	const cosDistance = Math.cos(d);
	const sinDistance = Math.sin(d);
	const sinFromLat = Math.sin(fromLat);
	const cosFromLat = Math.cos(fromLat);
	const sinLat = cosDistance * sinFromLat + sinDistance * cosFromLat * Math.cos(h);
	const dLng = Math.atan2(sinDistance * cosFromLat * Math.sin(h), cosDistance - sinFromLat * sinLat);
	return {
	  latitude: radiansToDegrees(Math.asin(sinLat)),
	  longitude: radiansToDegrees(fromLng + dLng),
	};
  };
  
  const getDirection = (startLocation, endLocation) => {
	let radians = Math.atan2(endLocation.longitude - startLocation.longitude, endLocation.latitude - startLocation.latitude);
	if (radians < 0) {
	  radians = radians + 2 * Math.PI;
	}
  
	const degree = radiansToDegrees(radians);
	const val = Math.floor(degree / 22.5 + 0.5);
	const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
	return directions[val % 16];
  };
  
  export const drawArcPolyline = (startLocation, endLocation, curveLine = 0.3) => {
	const result = [];
  
	// Curve line - set this between 0.2 to 0.5 for better results
	const k = curveLine;
  
	const d = computeDistance(startLocation, endLocation);
	const h = computeHeading(startLocation, endLocation);
  
	// Calculate the midpoint
	const p = computeOffset(startLocation, d * 0.5, h);
  
	// Calculate the position of the circle center
	const x = ((1 - k * k) * d * 0.5) / (2 * k);
	const r = ((1 + k * k) * d * 0.5) / (2 * k);
	const direction = getDirection(startLocation, endLocation);
	const angle = direction === 'W' || direction === 'NW' || direction === 'WNW' || direction === 'SW' || direction === 'WSW' ? -90 : 90;
	const c = computeOffset(p, x, h + angle);
  
	// Calculate the heading between center of the circle and two points
	const h1 = computeHeading(c, startLocation);
	const h2 = computeHeading(c, endLocation);
  
	const numpoints = 100.0;
	const step = (h2 - h1) / numpoints;
  
	for (let i = 0; i < numpoints; i++) {
	  const pi = computeOffset(c, r, h1 + i * step);
	  result.push(pi);
	}
	result.push(endLocation);
  
	return result;
  };
  
  // Example usage:
  const startLocation = { latitude: 28.6139, longitude: 77.209 };
  const endLocation = { latitude: 37.7749, longitude: -122.4194 };
  const arcCoordinates = drawArcPolyline(startLocation, endLocation, 0.3);
  console.log(arcCoordinates);
  