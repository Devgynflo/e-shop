import { GraphData } from "@/@types";
import { dbAuth } from "@/lib/prisma/db";
import moment from "moment";

export async function getGraphData() {
  try {
    // Get the start and end dates for the data range ( 7 days ago today)
    const startDate = moment().subtract(6, "days").startOf("day");
    console.log("🚀 ~ getGraphData ~ startDate:", startDate);
    const endDate = moment().endOf("day");
    console.log("🚀 ~ getGraphData ~ endDate:", endDate);

    // Query the database to get order data grouped by createdDate
    const result = await dbAuth.order.groupBy({
      by: ["createDate"],
      where: {
        createDate: {
          gte: startDate.toISOString(),
          lte: endDate.toISOString(),
        },
        status: "complete",
      },
      _sum: {
        amount: true,
      },
    });

    console.log("🚀 ~ getGraphData ~ result:", result);

    // Initialize an object to aggregate the date by day
    const aggregateData: {
      [day: string]: GraphData;
    } = {};

    // Create a clone of the start date to iterate over each day
    const currentDate = startDate.clone();
    console.log("🚀 ~ getGraphData ~ currentDate:", currentDate);

    // Iterate over each day in the date range
    while (currentDate <= endDate) {
      // Format the day as a string (e.g.. 'Monday')
      const day = currentDate.format("dddd");
      console.log("day<<<", day, currentDate);

      // Initialize the aggregated data for the day with the day, date, and totalAmount
      aggregateData[day] = {
        day,
        date: currentDate.format("YYYY-MM-DD"),
        totalAmount: 0,
      };

      // Move to the next day
      currentDate.add(1, "day");
    }

    // Calculate the total amount for each day by summing the order amounts
    result.forEach((entry) => {
      const day = moment(entry.createDate).format("dddd");
      const amount = entry._sum.amount || 0;
      aggregateData[day].totalAmount += amount;
    });

    // Convert the aggregateData object to an array and sort it by date
    const formattedData = Object.values(aggregateData).sort((a, b) =>
      moment(a.date).diff(moment(b.date)),
    );

    // return the formatted data
    return formattedData;
  } catch (error: any) {
    return new Error(error);
  }
}
