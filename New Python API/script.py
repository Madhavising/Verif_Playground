import sys
import pandas as pd
from bokeh.plotting import figure, save, output_file
from bokeh.models import Range1d, Label

def plot_digital_waveforms_bokeh(data, data_buses, output_html):
    try:
        required_columns = ["Time"] + data_buses
        for col in required_columns:
            if col not in data.columns:
                raise ValueError(f"Column '{col}' not found in the data.")

        time = data["Time"]
        num_time_points = len(time)
        num_buses = len(data_buses)

        p = figure(
            title="Digital Waveform Plot",
            x_range=Range1d(-1, num_time_points),
            y_range=(-1, 2 * num_buses - 1),
            x_axis_label="Time",
            width=1200, height=600
        )

        p.xgrid.grid_line_color = 'lightgray'
        p.background_fill_color = "white"

        for idx, bus_name in enumerate(data_buses):
            bus_data = data[bus_name]
            try:
                bus_data = pd.to_numeric(bus_data)
            except ValueError:
                bus_data = bus_data.apply(lambda x: 1 if 'D[A' in str(x) or str(x) == 'A' else 0)

            y_offset = 2 * idx
            y_values = [bus_data[i] + y_offset for i in range(num_time_points)]

            for i in range(num_time_points):
                p.patch([i - 0.5, i + 0.5, i + 0.5, i - 0.5],
                        [y_offset - 0.5, y_offset - 0.5, y_offset + 0.5, y_offset + 0.5],
                        color="lightgray", alpha=0.5, line_width=0)

            for i in range(num_time_points - 1):
                x0 = i
                y0 = y_values[i]
                x1 = i + 1
                y1 = y_values[i]
                p.segment(x0=x0, y0=y0, x1=x1, y1=y1, color="black", line_width=2)
                if y_values[i] != y_values[i + 1]:
                    p.segment(x0=x1, y0=y0, x1=x1, y1=y_values[i + 1], color="black", line_width=2)

            label = Label(x=-0.7, y=y_offset, text=bus_name, x_offset=-10, y_offset=0, text_align="right")
            p.add_layout(label)

        p.xaxis.ticker = list(range(num_time_points))
        p.xaxis.major_label_overrides = {i: str(time[i]) for i in range(num_time_points)}
        p.yaxis.major_tick_line_color = None
        p.yaxis.minor_tick_line_color = None
        p.yaxis.major_label_text_font_size = '0pt'
        p.yaxis.axis_line_color = None

        output_file(output_html)
        save(p)
        print("HTML saved successfully.")

    except Exception as e:
        print(f"An error occurred during plotting: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python script.py <input_excel_file> <output_html_file>")
        sys.exit(1)

    input_file = sys.argv[1]
    output_html = sys.argv[2]

    data_buses = ["ACLK", "ARADDR", "ARVALID", "ARREADY", "RDATA", "RLAST", "RVALID", "RREADY"]

    try:
        data = pd.read_excel(input_file, engine='xlrd')
        plot_digital_waveforms_bokeh(data, data_buses, output_html)
    except FileNotFoundError:
        print(f"Error: File not found at {input_file}")
    except pd.errors.ParserError:
        print(f"Error: Could not parse Excel file at {input_file}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
