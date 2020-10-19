import { rough,
  LitElement,
  html, css, svg,
  until,
} from './modules.bundle.js';

export default class SolarSimulation extends LitElement {
  static get properties() {
    return {
      minute: { type: Number },
      width: { type: Number },
      height: { type: Number },
      cells: { type: Number }, // number of cells in the solar panel
      area: { type: Number },  // area of each solar panel cell
    }
  }
  power(temperature, irradiance) {
    return this.efficiency(this.cellTemperature(temperature, irradiance)) * this.cells * this.area * irradiance;
  }
  cellTemperature(temperature, irradiance) {
    const NOCT = 47;
    const STC = this.STC;
    return temperature + (NOCT - STC.temperature) * irradiance / STC.irradiance;
  }
  efficiency(cellTemperature) {
    return 0.21 * (1- (cellTemperature - 25)*0.0042)
  }
  updateCells(event) {
    console.log('updateCells', event.target.value);
    this.cells = event.target.value;
  }
  updateArea(event) {
    console.log('updateArea', event.target.value);
    this.area = event.target.value;
  }
  constructor() {
    super();
    this.STC = {        // Standard Conditions
      temperature: 25,  // Degrees Celcius
      irradiance: 1000, // W/m^2
    };
    this.cells = 128;
    this.area = 0.024;

    this.battery = {
       voltage: 12,
       capacity: 120,
    }
    this.battery.maximum = this.battery.voltage * this.battery.capacity * 60 * 60 * 0.8;
    this.battery.energy = this.battery.maximum;
    this.usage = 30 * 60;

    this.minute = 0;
    this.content = fetch('days.json')
      .then(r => r.json())
      .then(result => {
        this.data = result;
        this.calculate(this.data);
        this.requestUpdate();
        return html`<google-chart type="md-line" .options=${this.options} .cols=${this.cols} .rows=${this.rows(this.days, this.minute)}></google-chart>`;
      });

      this.options = {
        chart: {
          title: "Power",
        },
        width: 1200,
        height: 500,
        series: {
          0: { axis: "Temperature" },
          1: { axis: "Irradiance" },
        },
        axes: {
          y: {
            Temperature: { label: "Temperature (Celcius)" },
            Irradiance: { label: "Irradiance w/m^2" },
          }
        }
      };
      this.cols = [
        { label: "Day", type: "number" },
        { label: "Temperature", type: "number" },
        { label: "Irradiance", type: "number" },
      ];
  }

  rows(days, minute) {
//     return days.map((minutes, day) => {
//       let {
//         charge,
//         temperature,
//         irradiance,
//       } = minutes[minute];
//       return [day, temperature, irradiance];
//     })
    console.log('calculatingRows');
    return days.map((minutes, day) => {
      return [day, ...minutes.reduce(([charge, temperature, irradiance], minute) => {
        return [
//           charge + minute.charge / 1440,
          temperature + minute.temperature / 1440,
          irradiance + minute.irradiance / 1440,
        ];
      }, [0, 0])]
    })   
  }
  calculate(days) {
    this.days = days.map(day => day.map(minute => {
      let energy = this.power(...minute) * 60;
      let { usage, battery } = this;
      if (energy > usage) {
        battery.energy += energy - usage;
        battery.energy = battery.energy > battery.maximum ?
          battery.maximum :
          battery.energy;
      } else battery.energy -= (usage - energy);
      return {
        charge: 0.8 * battery.energy / battery.maximum,
        temperature: minute[0],
        irradiance: minute[1],
      };
    }));
    let failed = this.days
      .findIndex(day => day.findIndex(minute => minute < 0.25) > -1);
    console.log(this.days, failed);
  }

  compress(data, number) {
    return data
      .reduce((reduced, [l, t, i], n) => {
        let period = Math.floor(n/number);
        if (!reduced[period]) { reduced[period] = []; }
        reduced[period][n % number] = [t, i]
        return reduced
      }, [])
      .map(datum => datum.reduce((reduced, [t, i]) => {
        let [tsum, isum] = reduced;
        return [tsum + t, isum + i];
      }, [0, 0]))
      .map(([t, i], n) => ([n, parseInt(100*t/number)/100, parseInt(10*i/number)/10]))

  }
  static get styles() {
    return css``
  }
  render() {
    console.log('render', this);
    return html`
      <h1>Pingelly Solar Simulation</h1>
      <h2>Solar Panel</h2>
      <button @click=${this.requestUpdate}>Update</button>
      <div>Total Solar Panel Area: ${this.cells*this.area}m<sup>2</sup></div>
      <label for="cells">Cell Quantity
        <wired-input id="cells" type="number" value=${this.cells} @change=${this.updateCells}></wired-slider>
      </label>
      <label for="area">Cell Area
        <wired-input id="area" type="number" value=${this.area} @change=${this.updateArea}></wired-slider>
      </label>
      ${until(this.content, html`<span>Loading...</span>`)}
    `;
  }

  annual(days, minute = 0) {
    console.log('annual', { days, minute });
    let height = 100;
    let width = 100;
    let thickness = 1;
    let length = 49;
    return svg`<svg viewBox="0 0 ${width} ${height}">
        <style>
        use {
            stroke-width: 0;
        }
        use.top {
            fill: #009fdf;
        }
        use.bottom {
            fill: #1b4686;
        }
        </style>
        <circle
          cx=${width/2} cy=${height/2} r=${length}
          stroke-width=${thickness}
          fill="yellow" stroke="green"
        />
    </svg>`;
  }

}

customElements.define('solar-simulation', SolarSimulation);

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