import React from 'react';
import ReactDOM from 'react-dom';
import { useWorldAtlas } from './useWorldAtlas';
import { useData } from './useData';
import { Marks } from './Marks';
import { Legend } from './Legend';
import {
  interpolateYlOrRd,
  scaleSequential,
  max,
  scaleLinear,
  scaleThreshold,
  axisBottom,
  tickSize,
  tickFormat,
  tickValues,
} from 'd3';

const width = window.innerWidth;
const height = window.innerHeight;

const App = () => {
  const worldAtlas = useWorldAtlas();

  const data = useData();

  if (!worldAtlas || !data) {
    return <pre>Loading...</pre>;
  }

  const x = scaleLinear()
    .domain([1, 60])
    .rangeRound([550, 850]);

  const color = scaleThreshold()
    .domain([3, 12, 21, 30, 39, 48, 57, 66])
    .range(d3.schemePurples[8]);

  const rowByID = new Map();
  data.forEach((d) => {
    const id = d.fips;
    rowByID.set(id, d);
  });
  const onMouseEnter = (d, e) => {
    let b = d.bachelorsOrHigher;
    let a = d.area_name;
    let s = d.state;

    e.pageX > window.innerWidth / 2
      ? (e.pageX = e.pageX - 120)
      : e.pageX;
    a.length > 15 &&
    e.pageX > window.innerWidth / 2
      ? (e.pageY = e.pageY - 40)
      : e.pageY;
    tooldiv
      .style('visibility', 'visible')
      .html(() => `${a}, ${s}: ${b}%`)
      .style('top', e.pageY - 40 + 'px')
      .style('left', e.pageX + 'px')
      .attr('data-education', b);
  };
  const onMouseOut = () => {
    tooldiv.style('visibility', 'hidden');
  };
  return (
    <>
      <div id="title">
        <h1>
          United States Educational Attainment
        </h1>
        <p id="description">
          Percentage of adults age 25 and older
          with a bachelor's degree or higher
          (2010-2014)
        </p>
      </div>
      <div className="copyright">
        Made by
        <a href="https://thembdev.com">
          <img src={"https://mbdev-utils.s3.eu-west-3.amazonaws.com/mbdev_logo_sm.svg"} alt="mbdev" />
        </a>
      </div>
      <svg width="940" height="600">
        <g className="map">
          <Legend x={x} color={color} />
          <Marks
            worldAtlas={worldAtlas}
            rowByID={rowByID}
            x={x}
            color={color}
            onMouseEnter={(e, d) =>
              onMouseEnter(e, d)
            }
            onMouseOut={() => onMouseOut()}
          />
        </g>
      </svg>
    </>
  );
};
const rootElement = document.getElementById(
  'root'
);
ReactDOM.render(<App />, rootElement);
