
// Not used, was used to compress original csv
function compressMinutes(minutes) {
  return minutes
    .map(minute => minute.split(','))
    .map(([
        year, month, day, hour, minute,
        time, temperature, humidity, irradiance,
        windSpeed, windDirection,
     ]) => ([Number(temperature), Number(irradiance)]))
    .reduce((reduced, [t, i], n) => {
      let period = Math.floor(n/10);
      if (!reduced[period]) { reduced[period] = []; }
      reduced[period][n % 10] = [t, i]
      return reduced
    }, [])
    .map(datum => datum.reduce((reduced, [t, i]) => {
      let [tsum, isum] = reduced;
      return [tsum + t, isum + i];
    }, [0, 0])).map(([t, i]) => ([parseInt(t)/10, parseInt(i/10)]))
}

// Not used, was used for raw original CSV
async function filter(path) {
    let data = await fetch(path).then(body => body.text());
    let [header, ...minutes] = data.split('\n');
    console.log(compressMinutes(minutes));

    minutes = minutes
        .map(minute => minute.split(','))
        .map(([
            year, month, day, hour, minute,
            time, temperature, humidity, irradiance,
            windSpeed, windDirection,
         ]) => ({
             energy: 10*60 * power(Number(temperature), Number(irradiance)),
             temperature, irradiance,
         }))
    return {
        header: header.split(','),
        minutes };
}

async function filter(path) {
    let data = await fetch(path).then(body => body.text());
    let [header, ...minutes] = data.split('\n');
    minutes = minutes
        .map(minute => minute.split(','))
        .map(([
            year, month, day, hour, minute,
            time, temperature, humidity, irradiance,
            windSpeed, windDirection,
         ]) => ({
             energy: 10*60 * power(Number(temperature), Number(irradiance)),
             temperature, irradiance,
         }))
    return {
        header: header.split(','),
        minutes };   
}
function power(temperature, irradiance) {
    const cells = 32;
    const area = 0.7688;
    return efficiency(cellTemperature(temperature, irradiance)) * cells * area * irradiance;
}

function cellTemperature(temperature, irradiance) {
    const NOCT = 47;
    const STC = {
        temperature: 25,  // degrees celcius
        irradiance: 1000, // W/m^2
    };
    return temperature + (NOCT - STC.temperature) * irradiance / STC.irradiance;
}

function efficiency(cellTemperature) {
    return 0.21 * (1- (cellTemperature - 25)*0.0042)
}

filter('solar-wind.csv').then(console.log)

