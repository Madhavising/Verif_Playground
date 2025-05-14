import sys
import pandas as pd
import matplotlib.pyplot as plt

def plot_digital_waveforms_matplotlib(data, data_buses, output_file):
    """
    Plots digital waveforms for the given data buses and saves the plot as a PNG file.

    Parameters:
    - data (pd.DataFrame): The input data containing time and data bus signals.
    - data_buses (list): List of data bus column names to be plotted.
    - output_file (str): Path to save the output PNG file.
    """
    try:
        required_columns = ["Time"] + data_buses
        for col in required_columns:
            if col not in data.columns:
                raise ValueError(f"Column '{col}' not found in the data.")

        time = data["Time"]
        num_time_points = len(time)
        num_buses = len(data_buses)

        fig, ax = plt.subplots(figsize=(12, 6))
        ax.set_title("Digital Waveform Plot")
        ax.set_xlabel("Time")
        ax.set_xlim(-1, num_time_points)
        ax.set_ylim(-1, 2 * num_buses - 1)

        for idx, bus_name in enumerate(data_buses):
            bus_data = data[bus_name]
            try:
                bus_data = pd.to_numeric(bus_data)
            except ValueError:
                bus_data = bus_data.apply(lambda x: 1 if 'D[A' in str(x) or str(x) == 'A' else 0)

            y_offset = 2 * idx
            y_values = [bus_data[i] + y_offset for i in range(num_time_points)]

            for i in range(num_time_points):
                ax.fill_betweenx(
                    [y_offset - 0.5, y_offset + 0.5],
                    i - 0.5, i + 0.5,
                    color="lightgray", alpha=0.5
                )

            for i in range(num_time_points - 1):
                x0, x1 = i, i + 1
                y0, y1 = y_values[i], y_values[i]
                ax.plot([x0, x1], [y0, y1], color="black", linewidth=2)
                if y_values[i] != y_values[i + 1]:
                    ax.plot([x1, x1], [y0, y_values[i + 1]], color="black", linewidth=2)

            ax.text(-1, y_offset, bus_name, ha="right", va="center", fontsize=10)

        ax.set_xticks(range(num_time_points))
        ax.set_xticklabels(time, rotation=45, ha="right")
        ax.yaxis.set_visible(False)

        plt.tight_layout()
        plt.savefig(output_file, dpi=300)
        plt.close(fig)
        print("PNG saved successfully.")

    except Exception as e:
        print(f"An error occurred during plotting: {e}")
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python script.py <input_excel_file> <output_png_file>")
        sys.exit(1)

    input_file = sys.argv[1]
    output_file = sys.argv[2]

    try:
        data = pd.read_excel(input_file, engine='xlrd')
        data_buses = [col for col in data.columns if col.lower() not in ["time", "clock"]]
        plot_digital_waveforms_matplotlib(data, data_buses, output_file)
    except FileNotFoundError:
        print(f"Error: File not found at {input_file}")
        sys.exit(1)
    except pd.errors.ParserError:
        print(f"Error: Could not parse Excel file at {input_file}")
        sys.exit(1)
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        sys.exit(1)
