import {
  geoNaturalEarth1,
  geoPath,
  geoGraticule,
  geoAlbersUsa,
  geoConicEqualArea,
} from 'd3';

const path = geoPath();

const missingDataColor = 'gray';
export const Marks = ({
  worldAtlas,
  rowByID,
  x,
  color,
  onMouseEnter,
  onMouseOut,
}) => (
  <g>
    {worldAtlas.map((feature) => {
      const d = rowByID.get(feature.id);
      // console.log((path(feature)));
      return (
        <path
          className="county"
          d={path(feature)}
          fill={
            d
              ? color(d.bachelorsOrHigher)
              : missingDataColor
          }
          data-fips={d.fips}
          data-education={d.bachelorsOrHigher}
          onMouseEnter={(e) => onMouseEnter(d, e)}
          onMouseOut={() => onMouseOut(null)}
        />
      );
    })}
  </g>
);
