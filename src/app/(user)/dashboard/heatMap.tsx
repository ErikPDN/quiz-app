"use client"

import Tooltip from '@uiw/react-tooltip';
import HeatMap from '@uiw/react-heat-map';
import { convertDateToString } from '@/lib/utils';

type Props = {
  data: { createdAt: Date; count: number }[];
}

const panelColors = { 0: "#6C7381", 8: "#7BC96F", 4: "#C6E48B", 12: "#239A3B", 32: "#196127" }

const SubmissionsHeatMap = (props: Props) => {
  const formattedDates = props.data.map((date) => ({
    date: convertDateToString(date.createdAt), count: date.count
  }))

  return (
    <div className="p-4">
      <HeatMap
        value={formattedDates}
        width="100%"
        style={{
          backgroundColor: "transparent",
          color: "#9ca3af"
        }}
        startDate={new Date('2025/01/01')}
        panelColors={panelColors}
        rectRender={(props, data) => {
          return (
            <Tooltip
              placement="top"
              fresh={true}
              content={`${data.count || 0}`}
            >
              <rect
                {...props}
                rx="2"
                className="transition-opacity hover:opacity-80"
              />
            </Tooltip>
          );
        }}
      />
    </div>
  )
};

export default SubmissionsHeatMap
